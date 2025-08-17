import logo from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-0 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              <img src={logo} alt="logo" className="h-8 sm:h-10" />
            </h3>
            <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
              致力于创新科技，为用户提供最优质的产品和服务体验。我们相信技术的力量能够改变世界。
            </p>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              快速链接
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  关于我们
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  产品服务
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              支持
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  联系我们
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  隐私政策
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-[#282828] my-6 sm:my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} 黑匣边缘计算. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
