import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="absolute z-20 inset-0 top-0 h-fit mx-auto w-full max-w-7xl text-[#848484] p-5 flex items-center justify-between">
    <h1 title="黑匣边缘计算">
      <img src={logo} alt="logo" />
    </h1>
    <nav className="flex items-center gap-15">
      <a
        className="hover:text-[#d3d3d3] text-[#d3d3d3] cursor-pointer transition-colors p-2"
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
    <button
      className="cursor-pointer hover:text-[#d3d3d3] transition-colors p-2 text-[#3d3d3d]"
      type="button"
    >
      使用协议
    </button>
  </header>
  )
}