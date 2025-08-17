import linux from '../assets/linux.svg'
import macos from '../assets/mac.svg'
import windows from '../assets/windows.svg'
import preview from '../assets/imgs/preview.png'

function WhatCanWeDo() {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-12 p-12">
      <h1 className="max-w-7xl mx-auto text-7xl font-bold leading-[4] text-[#1d1d1d]">
        黑匣边缘计算设备能做什么？
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-2 grid-row-2 text-white gap-12">
        <article className="row-span-2 grid-span-2 bg-gradient-to-b from-[#353535] to-[#181818] rounded-xl p-6 pb-12 space-y-12">
          <h2 className="text-4xl leading-[1.25] font-bold">
            识别任何操作系统的图像、 桌面软件的图像、 Web的图像的自动化流程
          </h2>
          <p className="text-[#757575] text-xl">
            可以实现任何操作系统的所有桌面视觉的自动化，图册、桌面图像检测、网页图像检测，或你日常使用的任何其他应用程序的图像检测。
          </p>
          <ul className="space-y-8 font-medium text-2xl">
            <li className="flex items-center gap-4">
              <img src={windows} alt="windows" />
              <span>Windows 操作系统</span>
            </li>
            <li className="flex items-center gap-4">
              <img src={macos} alt="macos" />
              <span>macOS 操作系统</span>
            </li>
            <li className="flex items-center gap-4">
              <img src={linux} alt="linux" />
              <span>Linux 操作系统</span>
            </li>
          </ul>
        </article>
        <article className="bg-[#F4F4F4] rounded-xl p-6">
          <h2 className="text-[#004DFF] font-bold text-3xl leading-[1.25] mb-24">
            任何需要有逻辑、规则的图像检测的操作，都可以使用黑匣边缘计算设备来实现
          </h2>
          <p className="text-[#757575] text-xl">
            黑匣HEX可以控制您的键盘和鼠标，就像人一样操作，从而节省一些重复性的劳动时间。
          </p>
        </article>
        <article className="bg-[#F4F4F4] rounded-xl p-6">
          <h2 className="text-[#FF7300] font-bold text-3xl leading-[1.25] mb-24">
            使用串口兼容调用外部设备，如：摄像头，机械臂，写字机器人等
          </h2>
          <p className="text-[#757575] text-xl">
            全自动操作外部设备，节省人力资源，满怀所想，尽在掌握！
          </p>
        </article>
      </div>
    </section>
  )
}

function LowCode() {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center gap-12 p-12 pb-24">
      <h1 className="max-w-7xl mx-auto text-7xl font-bold leading-[4] text-[#1d1d1d]">
        低代码搭建AI应用
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-2 grid-rows-4 gap-12 w-full">
        <article
          className="col-span-2 h-150 flex items-center justify-center rounded-xl p-12"
          style={{
            background:
              'linear-gradient(180deg, rgba(234, 130, 247, 0.25) 0%, rgba(130, 158, 247, 0.25) 55%, rgba(0, 174, 255, 0.25) 100%)',
          }}
        >
          <figure className="flex flex-row-reverse justify-between items-center w-full gap-12">
            <img width={550} src={preview} alt="lowCode" />
            <figcaption>
              <h2 className="text-4xl leading-[2] font-bold">
                简单易用的搭建和调试运行
              </h2>
              <p className="text-[#727272] font-medium">
                只需要简单的复制粘贴就可以得到YOLO 目标检测专精AI客制化脚本
              </p>
            </figcaption>
          </figure>
        </article>
        <article className="col-span-1 row-span-1 bg-[#F4F4F4] rounded-xl p-12">
          <h2 className="text-4xl font-bold flex items-center gap-2 mb-4">
            多元化框架导入
            <span className="relative pl-[2em] bg-[#FF8400]/20 text-base before:animate-ping rounded-full px-4 py-1 text-[#FF4800] before:content-[''] before:absolute before:left-[1em] before:top-1/2 before:-translate-y-1/2 before:inline-block before:size-2 before:rounded-full before:bg-[#FF4800] before:mr-2">
              持续接入
            </span>
          </h2>
          <p className="font-medium text-[#3D3D3D]">
            持续接入各版本YOLO框架及设备调用。
          </p>
        </article>
        <article className="col-span-1 row-span-1 bg-[#F4F4F4] rounded-xl p-12">
          <h2 className="text-4xl font-bold mb-4">自定义模型导入</h2>
          <p className="font-medium text-[#3D3D3D]">
            自行训练的模型可直接导入使用，多元化角度强
          </p>
        </article>
        <article className="col-span-1 row-span-1 bg-[#F4F4F4] rounded-xl p-12">
          <h2 className="text-4xl font-bold mb-4">分享脚本可加密</h2>
          <p className="font-medium text-[#3D3D3D]">
            如果创造出一个脚本，我想分享给其他人，也可脚本加密保护作品安全，当然，也可指定使用者使用！
          </p>
        </article>
        <article className="col-span-1 row-span-3 bg-[#1A1A1A] rounded-xl p-12">
          <h2 className="text-white text-4xl font-bold mb-4">
            丰富的UI调试组件
          </h2>
          <p className="text-[#707070] font-medium mb-8">
            持续添加用户所需的调试UI组件库的UI组件，亦使使用更加简单便捷，使用无需修改代码，界面可调。
          </p>
          <ul className="space-y-4">
            <li className="text-white">
              <h3 className="mb-4">提示框</h3>
              <div className="w-full h-12 bg-[#1EFF00]/10 text-[#00FF9D] border border-[#19A849] rounded-lg flex items-center justify-center">
                当前配置保存完毕！
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default function Features() {
  return (
    <section className="min-h-screen ">
      <WhatCanWeDo />
      <LowCode />
    </section>
  )
}
