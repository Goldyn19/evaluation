import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-[#F4F6F4] min-h-screen font-sans">
      {/* Header */}
      <header className="w-full bg-white/90 shadow-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-2 px-4">
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/NYSC-LOGO-removebg-preview.png"
              alt="NYSC Logo"
              width={183}
              height={117}
              className="h-[60px] w-auto"
              priority
            />
            <span className="hidden md:inline font-bold text-lg text-[#06752E] tracking-wide">NYSC EVALUATIONS</span>
          </a>
          <div className="text-sm text-[#06752E] font-semibold">
            <a href="/login" className="hover:underline">Log in</a>
          </div>
        </div>
      </header>

      {/* Hero Section with background image */}
      <section className="relative py-12 border-b border-[#e5e7eb] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/ny.png"
            alt="NYSC Hero Background"
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-green-900 opacity-70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4 text-white">
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Welcome To</h3>
          <div className="w-16 h-1 bg-[#1BAE70] mx-auto mb-4 rounded-full" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">NYSC Lagos Opinion SURVEY Centre</h2>
          <a href="#form" className="inline-block bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider transition">Fill my Form</a>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-12 bg-[#F4F6F4]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 px-4 items-center">
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/quote-1.png"
              alt="Quote"
              width={350}
              height={200}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
            <div className="bg-white/90 rounded-lg shadow p-6 w-full">
              <p className="text-xl font-semibold text-[#06752E] mb-2">We want your feedback!!!</p>
              <div className="text-[#4E5652] mb-2">- NYSC Evaluations Lagos</div>
              <div className="w-12 h-1 bg-[#1BAE70] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section id="form" className="py-12 bg-white border-t border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#14261C] text-center mb-8">OUR FORMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form 4A */}
            <div className="bg-[#F4F6F4] rounded-lg shadow p-6 flex flex-col items-center">
              <Image
                src="/form4a.jpg"
                alt="Form 4A"
                width={400}
                height={250}
                className="rounded mb-4"
              />
              <h5 className="text-lg font-bold text-[#06752E] mb-2">FORM 4A</h5>
              <p className="text-[#4E5652] mb-4 text-center">This questionnaire is designed to evaluate the programme implementation and effectiveness of the orientation course on corps members.</p>
              <a href="/dashboard" className="inline-flex items-center gap-2 bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-6 rounded-full uppercase transition">
                Fill Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
            {/* Form 4B */}
            <div className="bg-[#F4F6F4] rounded-lg shadow p-6 flex flex-col items-center">
              <Image
                src="/form4b.jpg"
                alt="Form 4B"
                width={400}
                height={200}
                className="rounded mb-4"
              />
              <h5 className="text-lg font-bold text-[#06752E] mb-2">FORM 4B</h5>
              <p className="text-[#4E5652] mb-4 text-center">This questionnaire is designed to evaluate the programme implementation and effectiveness of the NYSC Service Year. <br />For those passing out.</p>
              <a href="/dashboard" className="inline-flex items-center gap-2 bg-[#1BAE70] hover:bg-[#06752E] text-white font-bold py-2 px-6 rounded-full uppercase transition">
                Fill Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About/Images Section */}
      <section className="py-12 bg-[#F4F6F4]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] md:text-[34px] font-bold text-[#14261C] mb-2">WE ARE NYSC EVALUATIONS</h2>
            <div className="w-12 h-1 bg-[#1BAE70] mb-2 rounded-full" />
            <p className="text-[#4E5652] text-left text-[17px]">We want your feedback!! It means a lot to us. It helps us make the NYSC Experience a lot better for the next set.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/image1.jpg"
              alt="NYSC Group"
              width={360}
              height={200}
              className="rounded shadow"
            />
            <Image
              src="/image2.jpeg"
              alt="NYSC Fun"
              width={360}
              height={200}
              className="rounded shadow"
            />
          </div>
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/image3.png"
              alt="NYSC Swearing In"
              width={360}
              height={300}
              className="rounded shadow"
            />
            <Image
              src="/image4.jpg"
              alt="NYSC Swearing In 2"
              width={360}
              height={200}
              className="rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14261C] text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-sm">
            Babs Animashaun Rd, Surulere 101241, Lagos | Phone: <strong>+234 703 798 6020</strong> | Email: nyscevaluationlagos@gmail.com
          </div>
          <div className="text-center text-xs">Copyright © 2025 NYSC EVALUATIONS</div>
        </div>
      </footer>
    </main>
  );
}
