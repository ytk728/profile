'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 100;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    closeMobileMenu();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f5]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-sm border-b border-[#4f9bff]/20">
        <div className="container mx-auto px-8 py-6 flex justify-between items-center">
          <div
            onClick={scrollToTop}
            className="text-3xl font-bold text-[#4f9bff] cursor-pointer hover:text-[#3b82f6] transition-colors"
          >
            ytk728&apos;s profile
          </div>
          <nav className="hidden md:flex space-x-8 text-2xl">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-[#4f9bff] transition-colors cursor-pointer">About</a>
            <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')} className="hover:text-[#4f9bff] transition-colors cursor-pointer">Experience</a>
            <a href="#skills" onClick={(e) => handleSmoothScroll(e, 'skills')} className="hover:text-[#4f9bff] transition-colors cursor-pointer">Skills</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-[#4f9bff] transition-colors cursor-pointer">Contact</a>
          </nav>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-[#4f9bff] p-2 rounded-md hover:bg-[#4f9bff]/10 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-[#1a1a1a] border-b border-[#4f9bff]/20 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="container mx-auto px-8 py-4 space-y-4">
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="block text-xl hover:text-[#4f9bff] transition-colors cursor-pointer">About</a>
            <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')} className="block text-xl hover:text-[#4f9bff] transition-colors cursor-pointer">Experience</a>
            <a href="#skills" onClick={(e) => handleSmoothScroll(e, 'skills')} className="block text-xl hover:text-[#4f9bff] transition-colors cursor-pointer">Skills</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="block text-xl hover:text-[#4f9bff] transition-colors cursor-pointer">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(/background.png)',
          }}
        ></div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center fade-in relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#4f9bff] to-[#3b82f6] p-1">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <Image 
                  src="/favicon.ico" 
                  alt="Profile" 
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#4f9bff] to-[#3b82f6] bg-clip-text text-transparent">
            ytk728
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Software Engineer & Developer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="px-8 py-3 bg-[#4f9bff] text-white rounded-full hover:bg-[#3b82f6] transition-colors font-medium cursor-pointer"
            >
              Learn More
            </a>
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="px-8 py-3 border border-[#4f9bff] text-[#4f9bff] rounded-full hover:bg-[#4f9bff] hover:text-white transition-colors font-medium cursor-pointer"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#2a2a2a]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4f9bff]">
              About Me
            </h2>
            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#4f9bff]/20">
              <h3 className="text-2xl font-bold mb-4 text-[#4f9bff]">Self Introduction</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                東京都在住でWEBアプリケーションエンジニアをしています。
                <br />
                趣味はポケモン（ゲーム）とフットサルです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4f9bff]">
              Experience
            </h2>
            <div className="relative">
              {/* Timeline vertical line - ends before the last item */}
              <div className="absolute left-6 top-0 w-0.5 bg-[#4f9bff]/30" style={{ height: 'calc(100% - 120px)' }}></div>

              <div className="space-y-8">
                {/* WealthNavi */}
                <div className="flex items-start space-x-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4f9bff] rounded-full flex items-center justify-center text-white font-bold relative z-10">
                    W
                  </div>
                  <div className="flex-1 bg-[#2a2a2a] p-6 rounded-lg border border-[#4f9bff]/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#4f9bff]">WealthNavi</h3>
                      <span className="text-sm text-gray-400">2024年7月 - 現在</span>
                    </div>
                    <p className="text-[#4f9bff] font-semibold mb-2">プロダクト開発チーム</p>
                    <div className="text-gray-300 text-base space-y-1 mb-3">
                      <p>新規プロダクト開発</p>
                    </div>
                    <p className="text-[#4f9bff] font-semibold mb-2">金融システム開発チーム</p>
                    <div className="text-gray-300 text-base space-y-1">
                      <p>口座開設関連アプリケーション開発</p>
                    </div>
                  </div>
                </div>

                {/* 業務委託 */}
                <div className="flex items-start space-x-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4f9bff] rounded-full flex items-center justify-center text-white font-bold relative z-10">
                    B
                  </div>
                  <div className="flex-1 bg-[#2a2a2a] p-6 rounded-lg border border-[#4f9bff]/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#4f9bff]">業務委託</h3>
                      <span className="text-sm text-gray-400">2024年12月 - 現在</span>
                    </div>
                    <p className="text-[#4f9bff] font-semibold mb-2">エンジニア</p>
                    <div className="text-gray-300 text-base space-y-1">
                      <p>フリーランス向け書類作成アプリケーション開発</p>
                    </div>
                  </div>
                </div>

                {/* シンプレクス株式会社 */}
                <div className="flex items-start space-x-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4f9bff] rounded-full flex items-center justify-center text-white font-bold relative z-10">
                    S
                  </div>
                  <div className="flex-1 bg-[#2a2a2a] p-6 rounded-lg border border-[#4f9bff]/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#4f9bff]">シンプレクス株式会社</h3>
                      <span className="text-sm text-gray-400">2022年4月 - 2024年6月</span>
                    </div>
                    <p className="text-[#4f9bff] font-semibold mb-2">D2</p>
                    <div className="text-gray-300 text-base space-y-1">
                      <p>証券会社向けアプリケーション開発</p>
                    </div>
                  </div>
                </div>

                {/* 明治大学 */}
                <div className="flex items-start space-x-4 relative">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#4f9bff] rounded-full flex items-center justify-center text-white font-bold relative z-10">
                    M
                  </div>
                  <div className="flex-1 bg-[#2a2a2a] p-6 rounded-lg border border-[#4f9bff]/20">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-[#4f9bff]">明治大学</h3>
                      <span className="text-sm text-gray-400">2015年4月 - 2019年3月</span>
                    </div>
                    <p className="text-[#4f9bff] font-semibold mb-2">理工学部</p>
                    <div className="text-gray-300 text-base">
                      <p>機械情報工学科</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-[#2a2a2a]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4f9bff]">
              Tech Stack
            </h2>
            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#4f9bff]/20">
              <h3 className="text-2xl font-bold mb-6 text-[#4f9bff]">Technologies & Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-left border border-[#4f9bff]/10">
                  <div className="text-[#4f9bff] font-semibold text-left mb-2">Backend</div>
                  <div className="text-base text-gray-400">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Java</li>
                      <li>Spring Boot</li>
                      <li>Node.js</li>
                      <li>NestJS</li>
                      <li>TypeScript</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-left border border-[#4f9bff]/10">
                  <div className="text-[#4f9bff] font-semibold text-left mb-2">Frontend</div>
                  <div className="text-base text-gray-400">
                    <ul className="list-disc list-inside space-y-1">
                      <li>React</li>
                      <li>Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-left border border-[#4f9bff]/10">
                  <div className="text-[#4f9bff] font-semibold text-left mb-2">Middleware</div>
                  <div className="text-base text-gray-400">
                    <ul className="list-disc list-inside space-y-1">
                      <li>MySQL</li>
                      <li>PostgreSQL</li>
                      <li>Redis</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-[#2a2a2a] p-4 rounded-lg text-left border border-[#4f9bff]/10">
                  <div className="text-[#4f9bff] font-semibold text-left mb-2">Tools</div>
                  <div className="text-base text-gray-400">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Git/GitHub</li>
                      <li>AWS</li>
                      <li>Cursor/Devin</li>
                      <li>Docker</li>
                      <li>Auth0</li>
                      <li>Cursor/Devin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-[#4f9bff]">
              Get in Touch
            </h2>
            <div className="bg-[#2a2a2a] p-8 rounded-lg border border-[#4f9bff]/20">
              <p className="text-2xl text-gray-300 mb-8">
                Let&apos;s connect and discuss opportunities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://github.com/ytk728"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-40 py-3 bg-[#4f9bff] text-white rounded-full hover:bg-[#3b82f6] transition-colors font-medium inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/ytk-mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-40 py-3 border border-[#4f9bff] text-[#4f9bff] rounded-full hover:bg-[#4f9bff] hover:text-white transition-colors font-medium inline-flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#2a2a2a] border-t border-[#4f9bff]/20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 ytk728. Built with Next.js and deployed on GitHub Pages.
          </p>
        </div>
      </footer>
    </div>
  );
}
