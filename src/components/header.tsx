import { Button } from '@heroui/react'
import { useEffect, useState } from 'react'
import dark from '../assets/icons/dark.svg'
import light from '../assets/icons/light.svg'
import logo from '../assets/logo.svg'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <header className="absolute z-20 inset-0 top-0 h-fit mx-auto w-full max-w-7xl hd:max-w-9xl text-[#848484] p-5 flex items-center justify-between">
      <h1 title="黑匣边缘计算" className="hd:scale-125">
        <img src={logo} alt="logo" />
      </h1>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-15 hd:text-2xl">
        <a
          className="hover:text-[#d3d3d3] !text-[#d3d3d3] cursor-pointer transition-colors p-2"
          href="#"
        >
          首页
        </a>
        <a
          className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-2"
          href="#"
        >
          开发手册
        </a>
        <a
          className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-2"
          href="#"
        >
          综合工具
        </a>
        <a
          className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-2"
          href="#"
        >
          关于我们
        </a>
      </nav>
      {/* Desktop Button */}

      <nav className="hidden md:flex items-center gap-2 hd:text-2xl">
        <button
          className="cursor-pointer hover:text-[#d3d3d3] transition-colors p-2 text-[#3d3d3d]"
          type="button"
        >
          使用协议
        </button>
        <Button
          isIconOnly
          aria-label="theme"
          variant="light"
          onPress={() => {
            setIsDark(!isDark)
          }}
        >
          {isDark ? (
            <img src={dark} alt="dark" className="hd:scale-125" />
          ) : (
            <img src={light} alt="light" className="hd:scale-125" />
          )}
        </Button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden cursor-pointer hover:text-[#d3d3d3] transition-colors p-2"
        type="button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          role="presentation"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#181818] border-t border-[#282828] md:hidden">
          <nav className="flex flex-col p-4">
            <a
              className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-3 border-b border-[#282828]"
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              首页
            </a>
            <a
              className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-3 border-b border-[#282828]"
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              开发手册
            </a>
            <a
              className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-3 border-b border-[#282828]"
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              综合工具
            </a>
            <a
              className="hover:text-[#d3d3d3] cursor-pointer transition-colors p-3 border-b border-[#282828]"
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              关于我们
            </a>
            <nav className="flex items-center justify-between gap-2">
              <button
                className="cursor-pointer hover:text-[#d3d3d3] transition-colors p-3 text-[#3d3d3d] text-left"
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                使用协议
              </button>
              <Button
                isIconOnly
                aria-label="theme"
                color="default"
                onPress={() => {
                  setIsDark(!isDark)
                }}
              >
                {isDark ? (
                  <img src={dark} alt="dark" />
                ) : (
                  <img src={light} alt="light" />
                )}
              </Button>
            </nav>
          </nav>
        </div>
      )}
    </header>
  )
}
