import { cn } from '@heroui/react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.svg'

export default function Footer(props: { className?: string }) {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn('text-white absolute bottom-0 w-full', props.className)}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { delay: 1 } },
        exit: { opacity: 0, y: 100 },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-0 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col gap-4">
            <img src={logo} alt="logo" className="h-6 mr-auto" />
            <span className="text-white/60 text-sm">
              致力于创新科技，为用户提供最优质的产品和服务体验。我们相信技术的力量能够改变世界。
            </span>
          </div>
          <div className="flex gap-4 mt-auto">
            <span className="text-white/60 text-xs sm:text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </span>
            <a
              href="https://beian.miit.gov.cn/"
              className="text-white/60 text-xs sm:text-sm hover:text-white transition-colors"
            >
              京ICP备12345678号-1
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
