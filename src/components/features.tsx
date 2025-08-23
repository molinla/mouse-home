import linux from '../assets/linux.svg'
import macos from '../assets/mac.svg'
import windows from '../assets/windows.svg'

function WhatCanWeDo() {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-transparent flex flex-col items-center justify-center gap-6 md:gap-12 p-4 md:p-12">
      <h1 className="max-w-7xl mx-auto text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[4] text-[#1d1d1d] dark:text-white text-center">
        黑匣边缘计算设备能做什么？
      </h1>
    </section>
  )
}

function LowCode() {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-transparent flex flex-col items-center justify-center gap-6 md:gap-12 p-4 md:p-12 pb-12 md:pb-24">
      <h1 className="max-w-7xl mx-auto text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[4] text-[#1d1d1d] dark:text-white text-center">
        低代码搭建AI应用
      </h1>
    </section>
  )
}

export default function Features() {
  return (
    <article className="min-h-screen">
      <WhatCanWeDo />
      <LowCode />
    </article>
  )
}
