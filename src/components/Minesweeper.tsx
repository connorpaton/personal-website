'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';

type Cell = {
  x: number;
  y: number;
  isMine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
};

type GameState = 'ready' | 'running' | 'won' | 'lost';

export default function Minesweeper({ onClose }: { onClose: () => void }) {
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [mines, setMines] = useState(10);
  const [board, setBoard] = useState<Cell[][]>(() => makeEmptyBoard(9, 9));
  const [state, setState] = useState<GameState>('ready');
  const [flags, setFlags] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const reset = useCallback((w = width, h = height, m = mines) => {
    setBoard(makeEmptyBoard(w, h));
    setState('ready');
    setFlags(0);
    setStartTime(null);
    setElapsed(0);
  }, [width, height, mines]);

  useEffect(() => {
    if (state === 'running') {
      if (!timerRef.current) {
        timerRef.current = window.setInterval(() => {
          setElapsed((e) => e + 1);
        }, 1000) as unknown as number;
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state]);

  const minesLeft = Math.max(mines - flags, 0);

  const firstClickSeed = useRef<{ placed: boolean } | null>({ placed: false });

  const handleReveal = (x: number, y: number) => {
    if (state === 'lost' || state === 'won') return;
    let next = board.map((row) => row.map((c) => ({ ...c })));

    // place mines AFTER first click so you never lose immediately
    if (!firstClickSeed.current?.placed) {
      next = seedMines(next, mines, x, y);
      next = computeAdjacents(next);
      firstClickSeed.current = { placed: true };
    }

    if (state === 'ready') {
      setState('running');
      setStartTime(Date.now());
    }

    const cell = next[y][x];
    if (cell.revealed || cell.flagged) return;

    if (cell.isMine) {
      // reveal all mines
      next = next.map((row) => row.map((c) => (c.isMine ? { ...c, revealed: true } : c)));
      setBoard(next);
      setState('lost');
      return;
    }

    floodReveal(next, x, y);
    setBoard(next);

    // Check win condition
    const hiddenNonMines = next.flat().filter((c) => !c.isMine && !c.revealed).length;
    if (hiddenNonMines === 0) {
      setState('won');
      setBoard(next.map((row) => row.map((c) => (c.isMine ? { ...c, flagged: true } : c))));
    }
  };

  const handleFlag = (x: number, y: number) => {
    if (state === 'lost' || state === 'won') return;
    setBoard((prev) => {
      const next = prev.map((row) => row.map((c) => ({ ...c })));
      const c = next[y][x];
      if (c.revealed) return prev;
      c.flagged = !c.flagged;
      setFlags((f) => f + (c.flagged ? 1 : -1));
      return next;
    });
  };

  const changeDifficulty = (preset: 'beginner' | 'intermediate' | 'expert') => {
    if (preset === 'beginner') { setWidth(9); setHeight(9); setMines(10); reset(9, 9, 10); }
    if (preset === 'intermediate') { setWidth(16); setHeight(16); setMines(40); reset(16, 16, 40); }
    if (preset === 'expert') { setWidth(30); setHeight(16); setMines(99); reset(30, 16, 99); }
    firstClickSeed.current = { placed: false };
  };

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between rounded border-4 border-[#808080] bg-[#c0c0c0] p-4 shadow-[inset_-2px_-2px_0_0_#000,inset_2px_2px_0_0_#fff,inset_-4px_-4px_0_0_#808080,inset_4px_4px_0_0_#dfdfdf]">
        <SevenSeg value={minesLeft} />
        <button 
          onClick={() => { reset(); firstClickSeed.current = { placed: false }; }} 
          className="mx-4 grid h-20 w-20 place-items-center rounded border-4 border-[#808080] bg-[#c0c0c0] text-6xl shadow-[inset_-2px_-2px_0_0_#000,inset_2px_2px_0_0_#fff,inset_-4px_-4px_0_0_#808080,inset_4px_4px_0_0_#dfdfdf] active:shadow-[inset_2px_2px_0_0_#000,inset_-2px_-2px_0_0_#fff,inset_4px_4px_0_0_#808080,inset_-4px_-4px_0_0_#dfdfdf]"
        >
          {state === 'lost' ? '💀' : state === 'won' ? '😎' : '🙂'}
        </button>
        <SevenSeg value={elapsed} />
      </div>

      {/* Menu */}
      <div className="mb-4 flex gap-3 text-lg text-black">
        <Dropdown label="Game">
          <DropdownItem onClick={() => changeDifficulty('beginner')}>Beginner (9×9, 10 mines)</DropdownItem>
          <DropdownItem onClick={() => changeDifficulty('intermediate')}>Intermediate (16×16, 40 mines)</DropdownItem>
          <DropdownItem onClick={() => changeDifficulty('expert')}>Expert (30×16, 99 mines)</DropdownItem>
          <DropdownSeparator />
          <DropdownItem onClick={() => { reset(); firstClickSeed.current = { placed: false }; }}>New</DropdownItem>
          <DropdownItem onClick={onClose}>Exit</DropdownItem>
        </Dropdown>
        <Dropdown label="Help">
          <DropdownItem onClick={() => alert('Left‑click to reveal. Right‑click to flag. First click is safe. Good luck!')}>How to Play</DropdownItem>
        </Dropdown>
      </div>

      {/* Board */}
      <div className="inline-block rounded border border-[#808080] bg-[#c0c0c0] p-2 shadow-[inset_-1px_-1px_0_0_#000,inset_1px_1px_0_0_#fff,inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#dfdfdf]">
        <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${width}, 42px)` }}>
          {board.slice(0, height).map((row, y) =>
            row.slice(0, width).map((cell, x) => (
              <CellView
                key={`${x}-${y}`}
                cell={cell}
                onReveal={() => handleReveal(x, y)}
                onFlag={() => handleFlag(x, y)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button 
        onClick={() => setOpen((o) => !o)} 
        className="rounded border-2 border-[#808080] bg-[#c0c0c0] px-4 py-2 text-black font-bold shadow-[inset_-1px_-1px_0_0_#000,inset_1px_1px_0_0_#fff,inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#dfdfdf]"
      >
        {label}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-2 w-72 rounded border-2 border-[#808080] bg-[#f0f0f0] p-2 shadow-xl">
            {children}
          </div>
        </>
      )}
    </div>
  );
}

function DropdownItem({ children, onClick }: { children: React.ReactNode; onClick?: () => void; }) {
  return (
    <button 
      onClick={onClick} 
      className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-base text-black hover:bg-[#000080] hover:text-white"
    >
      {children}
    </button>
  );
}

function DropdownSeparator() { 
  return <div className="my-1 h-px bg-[#b0b0b0]" />; 
}

function SevenSeg({ value }: { value: number }) {
  const text = Math.max(0, Math.min(999, value | 0)).toString().padStart(3, '0');
  return (
    <div className="flex items-center gap-2">
      {text.split('').map((d, i) => (
        <div 
          key={i} 
          className="grid h-16 w-12 place-items-center rounded-sm bg-[#5c0000] text-[#ff2a2a] font-mono text-4xl font-bold leading-none shadow-inner"
        >
          {d}
        </div>
      ))}
    </div>
  );
}

function CellView({ cell, onReveal, onFlag }: { cell: Cell; onReveal: () => void; onFlag: () => void; }) {
  const size = 42; // 42px for chunky 90s look
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (e.type === 'click') onReveal();
  };
  const handleContext = (e: React.MouseEvent) => { 
    e.preventDefault(); 
    onFlag(); 
  };

  let content: React.ReactNode = null;
  if (cell.revealed) {
    if (cell.isMine) content = '💣';
    else if (cell.adjacent > 0) content = (
      <span style={{ color: adjacentColor(cell.adjacent) }}>{cell.adjacent}</span>
    );
  } else if (cell.flagged) {
    content = '🚩';
  }

  return (
    <button
      onClick={handleClick}
      onContextMenu={handleContext}
      style={{ width: `${size}px`, height: `${size}px`, lineHeight: `${size}px` }}
      className={`
        cursor-pointer select-none text-center text-xl font-bold flex items-center justify-center
        border border-[#808080]
        ${cell.revealed 
          ? 'bg-[#d4d0c8] shadow-none' 
          : 'bg-[#c0c0c0] shadow-[inset_-1px_-1px_0_0_#000,inset_1px_1px_0_0_#fff,inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#dfdfdf]'
        }
        ${cell.revealed && cell.isMine ? 'bg-red-500' : ''}
        active:shadow-[inset_1px_1px_0_0_#000,inset_-1px_-1px_0_0_#fff]
      `}
    >
      {content}
    </button>
  );
}

function adjacentColor(n: number) {
  // Classic Minesweeper colors
  const colors: { [key: number]: string } = {
    1: '#0000FF', // Blue
    2: '#008000', // Green
    3: '#FF0000', // Red
    4: '#000080', // Dark Blue
    5: '#800000', // Maroon
    6: '#008080', // Teal
    7: '#000000', // Black
    8: '#808080', // Gray
  };
  return colors[n] || '#000000';
}

// ======= Board helpers =======
function makeEmptyBoard(w: number, h: number): Cell[][] {
  return Array.from({ length: h }, (_, y) =>
    Array.from({ length: w }, (_, x) => ({ 
      x, y, isMine: false, revealed: false, flagged: false, adjacent: 0 
    }))
  );
}

function seedMines(board: Cell[][], mines: number, safeX: number, safeY: number): Cell[][] {
  const h = board.length; 
  const w = board[0].length;
  const coords: [number, number][] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dist = Math.abs(x - safeX) + Math.abs(y - safeY);
      if (dist <= 1) continue;
      coords.push([x, y]);
    }
  }
  shuffle(coords);
  const picked = coords.slice(0, Math.min(mines, coords.length));
  picked.forEach(([x, y]) => { board[y][x].isMine = true; });
  return board;
}

function computeAdjacents(board: Cell[][]): Cell[][] {
  const h = board.length; 
  const w = board[0].length;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      board[y][x].adjacent = neighbors(board, x, y).filter((c) => c.isMine).length;
    }
  }
  return board;
}

function neighbors(board: Cell[][], x: number, y: number): Cell[] {
  const out: Cell[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx, ny = y + dy;
      if (ny >= 0 && ny < board.length && nx >= 0 && nx < board[0].length) {
        out.push(board[ny][nx]);
      }
    }
  }
  return out;
}

function floodReveal(board: Cell[][], x: number, y: number) {
  const stack: [number, number][] = [[x, y]];
  while (stack.length) {
    const [cx, cy] = stack.pop()!;
    const c = board[cy][cx];
    if (c.revealed || c.flagged) continue;
    c.revealed = true;
    if (!c.isMine && c.adjacent === 0) {
      neighbors(board, cx, cy).forEach((n) => {
        if (!n.revealed && !n.flagged && !n.isMine) stack.push([n.x, n.y]);
      });
    }
  }
}

function shuffle<T>(arr: T[]): T[] { 
  for (let i = arr.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [arr[i], arr[j]] = [arr[j], arr[i]]; 
  } 
  return arr; 
}
