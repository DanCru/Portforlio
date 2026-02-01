import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Users, Calendar, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      category: 'Personal Project',
      description: 'Website portfolio cá nhân được xây dựng với React và TypeScript, tích hợp dark mode và đa ngôn ngữ.',
      longDescription: 'Dự án showcase kỹ năng frontend với responsive design, animations mượt mà, và SEO optimization.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      features: [
        'Dark/Light mode toggle',
        'Đa ngôn ngữ (VI/EN)',
        'Responsive design',
        'Smooth animations'
      ],
      metrics: {
        pages: '6+',
        performance: '90+ Lighthouse',
        responsive: '100%'
      },
      duration: '2 tuần',
      team: '1 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Live'
    },
    {
      title: 'Task Management App',
      category: 'Full Stack Project',
      description: 'Ứng dụng quản lý công việc với đầy đủ tính năng CRUD, authentication và real-time updates.',
      longDescription: 'Dự án học tập để practice full stack development với React frontend và Node.js backend.',
      image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      features: [
        'User authentication',
        'Create, Read, Update, Delete tasks',
        'Filter và search',
        'Responsive UI'
      ],
      metrics: {
        features: '10+',
        apis: '8',
        tests: '20+'
      },
      duration: '1 tháng',
      team: '1 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Completed'
    },
    {
      title: 'E-commerce Landing Page',
      category: 'Freelance Project',
      description: 'Landing page cho cửa hàng online với thiết kế hiện đại và tối ưu conversion.',
      longDescription: 'Dự án freelance đầu tiên, làm việc trực tiếp với khách hàng để hiểu yêu cầu và deliver sản phẩm.',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      features: [
        'Product showcase',
        'Contact form',
        'Mobile-first design',
        'SEO optimized'
      ],
      metrics: {
        sections: '5',
        loadTime: '2s',
        mobile: '100%'
      },
      duration: '1 tuần',
      team: '1 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Delivered'
    },
    {
      title: 'Weather App',
      category: 'Learning Project',
      description: 'Ứng dụng tra cứu thời tiết với API integration và clean UI design.',
      longDescription: 'Dự án học tập để hiểu cách làm việc với APIs và xử lý dữ liệu bất đồng bộ.',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'OpenWeather API', 'CSS Modules'],
      features: [
        'Tìm kiếm thành phố',
        'Hiển thị thời tiết real-time',
        'Dự báo 5 ngày',
        'Responsive design'
      ],
      metrics: {
        cities: 'Unlimited',
        apiCalls: 'Real-time',
        accuracy: '100%'
      },
      duration: '1 tuần',
      team: '1 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Completed'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 dark:text-white">
            Dự án nổi bật
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-4"></div>
          <p className="text-lg dark:text-white text-gray-600 max-w-2xl mx-auto">
            Tổng hợp các dự án tiêu biểu mà tôi đã tham gia phát triển, 
            từ ứng dụng web quy mô lớn đến giải pháp mobile sáng tạo.
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
              {/* Project Image */}
              <div className="lg:w-1/2">
                <div className="relative group overflow-hidden rounded-lg shadow-lg ">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <button className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full transition-colors">
                        <Play size={20} />
                      </button>
                      <button className="bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition-colors">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="lg:w-1/2 space-y-6">
                <div>
                  <div className="text-sky-600 font-medium mb-2">{project.category}</div>
                  <h3 className="text-3xl font-bold dark:text-white text-blue-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-white text-lg leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <p className="text-gray-700 dark:text-white leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-bold dark:text-blue-500 text-blue-900 mb-3">Tính năng chính:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex dark:text-white items-center text-gray-700">
                        <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 bg-white dark:bg-gray-700 p-3 md:p-4 rounded-lg shadow">
                  {Object.entries(project.metrics).map(([key, value], mIndex) => (
                    <div key={mIndex} className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-sky-600">{value}</div>
                      <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Project Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex dark:text-white items-center">
                    <Calendar size={16} className="mr-2" />
                    {project.duration}
                  </div>
                  <div className="flex dark:text-white items-center">
                    <Users size={16} className="mr-2" />
                    Team {project.team}
                  </div>
                  <div className="flex dark:text-white items-center">
                    <Code size={16} className="mr-2" />
                    {project.technologies.length} công nghệ
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIndex) => (
                    <span 
                      key={tIndex}
                      className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex items-center bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    <ExternalLink size={18} className="mr-2" />
                    Xem Demo
                  </button>
                  <button className="flex dark:bg-gray-700 dark:border-sky-600 dark:text-white dark:hover:bg-sky-500 items-center border border-gray-300 hover:border-sky-500 text-gray-700 hover:text-sky-600 px-6 py-3 rounded-lg font-medium transition-colors">
                    <Github size={18} className="mr-2" />
                    Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects */}
        <div className="text-center mt-16">
          <button className="bg-white hover:bg-gray-50 text-sky-600 border-2 border-sky-500 hover:border-sky-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Xem thêm dự án trên GitHub
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;