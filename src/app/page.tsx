
export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f5]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-[#a59aca]/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#a59aca]">
            ytk728
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="hover:text-[#a59aca] transition-colors">About</a>
            <a href="#experience" className="hover:text-[#a59aca] transition-colors">Experience</a>
            <a href="#skills" className="hover:text-[#a59aca] transition-colors">Skills</a>
            <a href="#contact" className="hover:text-[#a59aca] transition-colors">Contact</a>
          </nav>
          <div className="md:hidden">
            <button className="text-[#a59aca]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center geometric-pattern">
        <div className="container mx-auto px-6 text-center fade-in">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#a59aca] to-[#8b7db8] p-1">
              <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <span className="text-4xl font-bold text-[#a59aca]">Y</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#a59aca] to-[#8b7db8] bg-clip-text text-transparent">
            ytk728
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Software Engineer & Developer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#about" 
              className="px-8 py-3 bg-[#a59aca] text-white rounded-full hover:bg-[#8b7db8] transition-colors font-medium"
            >
              Learn More
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border border-[#a59aca] text-[#a59aca] rounded-full hover:bg-[#a59aca] hover:text-white transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#2a2a2a]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#a59aca]">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#a59aca]/20">
                  <h3 className="text-2xl font-bold mb-4 text-[#a59aca]">Self Introduction</h3>
                  <p className="text-gray-300 leading-relaxed">
                    [This section will be updated with personal introduction]
                  </p>
                  <p className="text-gray-300 leading-relaxed mt-4">
                    Please add your self-introduction here. This is a placeholder that can be easily updated later.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#a59aca]/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#a59aca]/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#a59aca]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-[#a59aca]">Innovation</h4>
                  </div>
                  <p className="text-gray-300">Passionate about creating innovative solutions and exploring new technologies.</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#a59aca]/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#a59aca]/20 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-[#a59aca]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-[#a59aca]">Collaboration</h4>
                  </div>
                  <p className="text-gray-300">Experienced in working with diverse teams and contributing to open-source projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#a59aca]">
              Experience
            </h2>
            <div className="bg-[#2a2a2a] p-8 rounded-lg border border-[#a59aca]/20">
              <h3 className="text-2xl font-bold mb-4 text-[#a59aca]">Professional Experience</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                [This section will be updated with professional experience and career history]
              </p>
              <p className="text-gray-300 leading-relaxed">
                Please add your professional experience, work history, projects, and achievements here. 
                This is a placeholder that can be easily updated later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#2a2a2a]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#a59aca]">
              Tech Stack
            </h2>
            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#a59aca]/20">
              <h3 className="text-2xl font-bold mb-6 text-[#a59aca]">Technologies & Skills</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                [This section will be updated with technical skills and technology stack]
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-center border border-[#a59aca]/10">
                  <div className="text-[#a59aca] font-semibold">Frontend</div>
                  <div className="text-sm text-gray-400 mt-1">To be updated</div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-center border border-[#a59aca]/10">
                  <div className="text-[#a59aca] font-semibold">Backend</div>
                  <div className="text-sm text-gray-400 mt-1">To be updated</div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-center border border-[#a59aca]/10">
                  <div className="text-[#a59aca] font-semibold">Database</div>
                  <div className="text-sm text-gray-400 mt-1">To be updated</div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-center border border-[#a59aca]/10">
                  <div className="text-[#a59aca] font-semibold">Tools</div>
                  <div className="text-sm text-gray-400 mt-1">To be updated</div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mt-6">
                Please add your specific technologies, programming languages, frameworks, and tools here. 
                This is a placeholder that can be easily updated later.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[#a59aca]">
              Get in Touch
            </h2>
            <div className="bg-[#2a2a2a] p-8 rounded-lg border border-[#a59aca]/20">
              <p className="text-xl text-gray-300 mb-8">
                Let&apos;s connect and discuss opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://github.com/ytk728" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-[#a59aca] text-white rounded-full hover:bg-[#8b7db8] transition-colors font-medium inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a 
                  href="mailto:ytk.mac@gmail.com" 
                  className="px-8 py-3 border border-[#a59aca] text-[#a59aca] rounded-full hover:bg-[#a59aca] hover:text-white transition-colors font-medium inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#2a2a2a] border-t border-[#a59aca]/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 ytk728. Built with Next.js and deployed on GitHub Pages.
          </p>
        </div>
      </footer>
    </div>
  );
}
