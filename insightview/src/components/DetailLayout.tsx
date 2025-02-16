import Link from "next/link";

export default function DetailLayout({ title, imageUrl, children }) {
  return (
    <div className="min-h-screen">
      <div 
        className="relative text-white py-32 px-8 min-h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${imageUrl}')` }}
      >
        <div className="container mx-auto">
          <Link href="/" className="inline-block mb-8 text-red-400 hover:text-red-300">
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}