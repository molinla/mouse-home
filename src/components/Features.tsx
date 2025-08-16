export default function Features() {
  const features = [
    {
      title: '高性能',
      description: '采用最新技术栈，保证最佳的性能表现和用户体验。',
      icon: '🚀',
    },
    {
      title: '易于使用',
      description: '简洁直观的设计理念，让用户能够快速上手和使用。',
      icon: '✨',
    },
    {
      title: '安全可靠',
      description: '企业级安全保障，确保您的数据安全和隐私保护。',
      icon: '🛡️',
    },
    {
      title: '响应式设计',
      description: '完美适配各种设备屏幕，随时随地享受最佳体验。',
      icon: '📱',
    },
    {
      title: '24/7 支持',
      description: '专业的技术支持团队，随时为您提供帮助和解决方案。',
      icon: '🤝',
    },
    {
      title: '持续更新',
      description: '定期更新和功能改进，始终保持产品的先进性。',
      icon: '🔄',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            为什么选择我们
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            我们专注于提供创新的解决方案，帮助您实现业务目标
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
