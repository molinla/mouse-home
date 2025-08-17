import device from '../assets/imgs/device.png'
import LightRays from '../hero-sections/light-rays'
import TextType from '../hero-sections/text-type'

export default function Hero() {
  return (
    <section className="relative h-screen">
      <LightRays className="absolute inset-0 z-0" />
      <div className="absolute inset-0 top-0 text-white h-screen flex flex-col gap-8 hd:gap-12 pt-20 items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="animated-gradient text-xl md:text-3xl hd:text-5xl font-bold">
          黑匣HEX·AI Deep learning
        </h1>
        <TextType
          as="p"
          variableSpeed={{ min: 50, max: 150 }}
          pauseDuration={3500}
          deletingSpeed={30}
          className="text-3xl font-bold md:text-6xl hd:text-7xl"
          text={[
            '全面聚合AI边缘计算视觉深度学习',
            '智能边缘设备·实时AI视觉处理',
            '深度学习算法·边缘计算加速',
            '一站式AI视觉解决方案',
            '边缘智能·赋能视觉创新',
          ]}
        />
        <p className="text-lg font-bold md:text-2xl hd:text-3xl">
          边缘计算设备·轻松调用并创造AI视觉
        </p>
        <img
          className="mt-10 hd:mt-20 hd:scale-125"
          draggable={false}
          width={723}
          height={407}
          src={device}
          alt="device"
        />
      </div>
      <div className="absolute z-10 bg-[#F4CD2E] bottom-0 blur-[541px] left-0 size-[340px] rounded-full opacity-30"></div>
      <div className="absolute z-10 bg-[#ED9BFC] bottom-0 blur-[541px] right-0 size-[340px] rounded-full opacity-30"></div>
    </section>
  )
}
