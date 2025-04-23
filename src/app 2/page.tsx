import WaveBackground from "@/components/WaveBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <WaveBackground />
      <div className="text-center z-10">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-lg text-gray-600">Move your cursor to interact with the waves</p>
      </div>
    </main>
  );
} 