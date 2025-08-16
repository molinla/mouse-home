import { useState, useId } from 'react'

export default function Contact() {
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('感谢您的留言！我们会尽快回复您。')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            联系我们
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            有任何问题或合作意向？我们很乐意听取您的想法
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              联系方式
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 mr-4 text-blue-600">📧</div>
                <span className="text-gray-700">contact@mousehome.com</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 mr-4 text-blue-600">📞</div>
                <span className="text-gray-700">+86 138 0013 8000</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 mr-4 text-blue-600">📍</div>
                <span className="text-gray-700">北京市朝阳区科技园区</span>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                工作时间
              </h4>
              <p className="text-gray-700">
                周一至周五: 9:00 - 18:00
                <br />
                周六: 10:00 - 16:00
                <br />
                周日: 休息
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor={nameId}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  姓名
                </label>
                <input
                  type="text"
                  id={nameId}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor={emailId}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  邮箱
                </label>
                <input
                  type="email"
                  id={emailId}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor={messageId}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  留言
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
