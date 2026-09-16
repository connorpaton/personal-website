import styles from '@/app/walk/walk.module.css';

const trees = Array.from({ length: 55 }, (_, index) => ({
  left: 15 + (index * 67) % 345,
  top: 300 + Math.floor(index / 11) * 37 + (index * 13) % 27,
  size: 0.7 + (index % 5) * 0.12,
})).sort((first, second) => first.top - second.top);

export default function WalkLandscape() {
  return (
    <svg viewBox="0 0 960 600" className={styles.landscape} aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      <defs>
        <pattern id="walk-dither" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="1.5" height="1.5" fill="currentColor" opacity="0.28" />
          <rect x="3" y="3" width="1.5" height="1.5" fill="currentColor" opacity="0.28" />
        </pattern>
        <pattern id="walk-water" width="80" height="26" patternUnits="userSpaceOnUse">
          <path d="M4 5h15 M48 18h24" stroke="var(--walk-foam)" strokeWidth="2" opacity="0.4" />
          <rect x="33" y="8" width="2" height="2" fill="var(--walk-foam)" opacity="0.4" />
        </pattern>
        <g id="walk-pine">
          <path d="M-3 0h6v-45h-6z" fill="var(--walk-bark)" />
          <path d="M0-74h6v12h7v12h7v13h8v12h-56v-12h8v-13h7v-12h7z" fill="var(--walk-pine)" />
          <path d="M0-74v49h28v-12h-8v-13h-7v-12H6v-12z" fill="var(--walk-pine-shadow)" />
          <path d="M0-74h6v12h7v12h7v13h8v12h-56v-12h8v-13h7v-12h7z" fill="url(#walk-dither)" />
        </g>
      </defs>
      <rect width="960" height="600" fill="var(--walk-sky)" />
      <rect y="110" width="960" height="120" fill="var(--walk-haze)" />
      <rect width="960" height="230" fill="url(#walk-dither)" />
      <g className={styles.daySky}>
        <path d="M738 52h36v6h8v9h6v30h-6v9h-8v6h-36v-6h-8v-9h-6V67h6v-9h8z" fill="#f5cb86" />
        <path d="M80 76h30V64h58v8h30v10h30v9H80z M460 105h28V93h45v6h26v9h38v10H460z M813 141h26v-9h54v8h40v12H813z" fill="var(--walk-cloud)" />
      </g>
      <g className={styles.nightSky} fill="#dfdfbd">
        {Array.from({ length: 47 }, (_, index) => (
          <rect key={index} x={18 + (index * 139) % 920} y={15 + (index * 43) % 150} width={index % 8 === 0 ? 3 : 1.5} height={index % 8 === 0 ? 3 : 1.5} opacity={0.45 + (index % 4) * 0.15} />
        ))}
        <path d="M754 47h18v7h-14v12h-6v26h7v11h13v6h-23v-7h-10V90h-5V66h7V54h13z" />
      </g>
      <path d="M0 251v-33h32v-20h36v-22h32v-25h31v-33h26v-23h24v-25h20v25h25v30h26v23h23v28h36v28h28v28h34v28h33v-38h30v-22h29v-26h24v-26h24v26h27v29h31v24h34v26h42v-24h38v-27h34v-27h35v-28h28v-20h22v-23h25v23h23v26h25v28h26v25h31v28h29v70H0z" fill="var(--walk-far-mountain)" />
      <path d="M0 310v-49h31v-32h36v-28h33v-27h34v-37h29v-32h23v-25h20v25h24v31h25v29h30v28h30v31h32v25h31v29h36v31h30v27H0z" fill="var(--walk-mountain)" />
      <path d="M186 105V80h20v25h24v31h25v29h30v28h30v31h32v25h31v29h36v31h30v27H210v-40h-14v-48h18v-46h-17v-37h-11z" fill="var(--walk-mountain-shadow)" />
      <path d="M134 137h29v-32h23V80h20v25h24v31h25v29h-30v-12h-21v18h-20v-24h-22v13h-28z" fill="var(--walk-snow)" />
      <path d="M0 310v-49h31v-32h36v-28h33v-27h34v-37h29v-32h23v-25h20v25h24v31h25v29h30v28h30v31h32v25h31v29h36v31h30v27H0z" fill="url(#walk-dither)" />
      <path d="M0 329h61v-22h58v-18h55v-18h66v10h64v22h67v-15h61v-22h62v-19h72v-15h70v16h51v21h55v13h67v20h62v18h79v280H0z" fill="var(--walk-meadow)" />
      <path d="M0 410h95v-22h70v-18h67v-11h86v17h61v20h47v24h43v35h46v145H0z" fill="var(--walk-grass)" />
      <path d="M960 298H845v25h-53v29h-39v32h-31v34h-40v30h-45v33h-28v32h-29v42h-31v45h411z" fill="var(--walk-sand)" />
      <path d="M960 316H858v25h-49v29h-39v32h-31v34h-40v30h-45v33h-28v32h-29v42h-22v27h385z" fill="var(--walk-water)" />
      <path d="M960 316H858v25h-49v29h-39v32h-31v34h-40v30h-45v33h-28v32h-29v42h-22v27h385z" fill="url(#walk-water)" />
      <path d="M960 330h-90v25h-49v29h-39v32h-31v34h-40v30h-45v33h-28v32h-29v42" fill="none" stroke="var(--walk-foam)" strokeWidth="3" opacity="0.5" />
      <path d="M476 600v-66h-31v-51h-21v-44h-27v-50h40v-37h51v-32h70v-28h70v-12h63" stroke="var(--walk-path)" strokeWidth="14" fill="none" />
      <path d="M413 389h-73v-36h-49v-48h-34v-32" stroke="var(--walk-path)" strokeWidth="9" fill="none" />
      <path d="M0 329h61v-22h58v-18h55v-18h66v10h64v22h67v-15h61v-22h62v-19h72v-15h70v16h51v21h55v13h67v20h62v18h79" fill="none" stroke="var(--walk-grass-light)" strokeWidth="5" />
      <g>
        {trees.map((tree, index) => (
          <use key={index} href="#walk-pine" transform={`translate(${tree.left} ${tree.top}) scale(${tree.size})`} />
        ))}
        <use href="#walk-pine" transform="translate(606 293) scale(.8)" />
        <use href="#walk-pine" transform="translate(788 292) scale(.9)" />
        <use href="#walk-pine" transform="translate(820 304) scale(.7)" />
      </g>
      <g>
        <path d="M634 288h124v10H634z" fill="var(--walk-pine-shadow)" opacity="0.4" />
        <path d="M647 241h94v47h-94z" fill="var(--walk-cabin)" />
        <path d="M647 250h94M647 263h94M647 276h94" stroke="var(--walk-bark)" strokeWidth="3" opacity="0.55" />
        <path d="M719 199h12v34h-12z" fill="var(--walk-bark)" />
        <path d="M634 246v-9h12v-11h13v-11h12v-11h14v-10h18v10h13v11h13v11h13v11h12v9z" fill="var(--walk-roof)" />
        <path d="M703 204h13v11h13v11h13v11h12v9h-60v-42z" fill="var(--walk-bark)" opacity="0.45" />
        <rect x="685" y="260" width="17" height="28" fill="var(--walk-bark)" />
        <rect x="657" y="254" width="17" height="17" fill="var(--walk-window)" />
        <rect x="713" y="254" width="17" height="17" fill="var(--walk-window)" />
        <path d="M665 254v17m56-17v17" stroke="var(--walk-bark)" strokeWidth="2" />
        <path className={styles.nightSky} d="M657 271l-20 30h55l-18-30M713 271l-14 30h52l-21-30" fill="#e7b875" opacity="0.12" />
        <path d="M724 192v-15h10v-17h-5v-15" stroke="var(--walk-cloud)" strokeWidth="7" fill="none" opacity="0.55" />
      </g>
      <g>
        {Array.from({ length: 65 }, (_, index) => {
          const left = 375 + (index * 41) % 218;
          const top = 333 + (index * 37) % 242;
          return <path key={index} d={`M${left} ${top}v-5m0 2h3`} stroke={index % 4 === 0 ? 'var(--walk-flower)' : 'var(--walk-grass-light)'} strokeWidth="2" />;
        })}
      </g>
      <g transform="translate(472 467)">
        <ellipse className={styles.nightSky} cy="4" rx="45" ry="22" fill="#efb16f" opacity="0.14" />
        <path d="M-20 9h38v7h-38zM-14 1h28v7h-28z" fill="var(--walk-bark)" />
        <path d="M-12 2v-13h5v-14h5v-12h5v17h7v9h5V2H8v7H-6V2z" fill="#d96c45" />
        <path d="M-5 4V-9h5v-10h4v15h5v8z" fill="#f4ca78" />
        <rect x="-30" y="24" width="49" height="7" fill="var(--walk-bark)" />
        <path d="M-24 25V10h15v15h7v6h-29v-6z" fill="var(--walk-person)" />
        <rect x="-22" y="2" width="11" height="11" fill="#c79770" />
        <path d="M-24 2v-4h15v7h-15z" fill="var(--walk-bark)" />
      </g>
      <rect y="285" width="960" height="315" fill="url(#walk-dither)" opacity="0.16" />
      <g fill="var(--walk-foam)" opacity="0.55">
        <path d="M831 508h43v3h-43zM761 540h27v3h-27zM884 419h39v3h-39zM737 482h22v3h-22z" />
      </g>
    </svg>
  );
}
