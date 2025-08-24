const imagesModules = import.meta.glob('../assets/screenshots/*.png', {
  eager: true,
})

function WhatCanWeDo() {
  const images = Object.entries(imagesModules).map(
    ([_, module]) => (module as any).default as string
  )
  console.log(images)
  return (
    <section className="w-full min-h-screen bg-white dark:bg-transparent flex flex-col items-center justify-center gap-6 md:gap-12 p-4 md:p-12">
      <h1 className="max-w-7xl mx-auto text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[4] text-[#1d1d1d] dark:text-white text-center">
        黑匣边缘计算设备能做什么？
      </h1>
      <section className="w-full h-full flex items-center justify-between gap-36 mt-24">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">AI边缘检测计算</h2>
          <p className="text-lg">
            可以实现任何操作系统的所有桌面视觉的自动化，图册、桌面图像检测、网页图像检测，或你日常使用的任何其他应用程序的图像检测。
          </p>
        </div>
        <div className="relative w-full px-24 pt-24 flex items-center justify-center">
          <div className="relative transform-3d origin-left rotate-y-12">
            {images.map((image, index) => (
              <img
                src={image}
                className="first:relative not-first:absolute px-[20%] pt-[10%] pb-0"
                style={{
                  left: `${index * 16}px`,
                  top: `-${index * 12}px`,
                  zIndex: 10 - index,
                }}
                alt="screenshot"
                key={image}
              />
            ))}
          </div>
        </div>
      </section>
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
