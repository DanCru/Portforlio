import React from 'react';
import { ExternalLink, Github, Play, Users, Calendar, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Full Stack Development',
      description: 'Nền tảng thương mại điện tử hoàn chỉnh với microservices architecture, xử lý hàng nghìn giao dịch mỗi ngày.',
      longDescription: 'Hệ thống bao gồm: Frontend React/Next.js, Backend Node.js với Express, Database PostgreSQL và Redis, Payment gateway tích hợp, Admin dashboard, Mobile app React Native.',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
      features: [
        'Xử lý 10,000+ đơn hàng/ngày',
        'Tích hợp 5+ payment gateway',
        'Real-time inventory management',
        'Advanced analytics dashboard'
      ],
      metrics: {
        users: '50K+',
        uptime: '99.9%',
        performance: '2s load time'
      },
      duration: '8 tháng',
      team: '6 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Production'
    },
    {
      title: 'Healthcare Management System',
      category: 'Enterprise Solution',
      description: 'Hệ thống quản lý bệnh viện tích hợp AI để hỗ trợ chẩn đoán và quản lý hồ sơ bệnh án điện tử.',
      longDescription: 'Giải pháp toàn diện cho bệnh viện bao gồm: Quản lý bệnh nhân, Lịch hẹn khám, Hồ sơ điện tử, Tích hợp máy móc y tế, AI assistant cho bác sĩ.',
      image: 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'TensorFlow', 'Docker'],
      features: [
        'AI-powered diagnosis support',
        'Electronic health records',
        'Appointment scheduling system',
        'Equipment integration'
      ],
      metrics: {
        users: '1K+',
        uptime: '99.8%',
        performance: '1.5s load time'
      },
      duration: '12 tháng',
      team: '8 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Production'
    },
    {
      title: 'Real-time Analytics Dashboard',
      category: 'Data Visualization',
      description: 'Dashboard phân tích dữ liệu real-time với khả năng xử lý hàng triệu data points, visualization tương tác và alerting system.',
      longDescription: 'Hệ thống dashboard cho phép: Real-time data streaming, Interactive charts và graphs, Custom alerts và notifications, Data export và reporting, Multi-tenant architecture.',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'WebSocket', 'InfluxDB', 'Grafana', 'Kubernetes'],
      features: [
        'Real-time data streaming',
        'Interactive visualizations',
        'Custom alert system',
        'Multi-tenant support'
      ],
      metrics: {
        users: '500+',
        uptime: '99.9%',
        performance: '500ms response'
      },
      duration: '6 tháng',
      team: '4 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Production'
    },
    {
      title: 'Mobile Learning App',
      category: 'Mobile Development',
      description: 'Ứng dụng học tập trên di động với AI personalization, offline learning và gamification elements.',
      longDescription: 'App học tập bao gồm: Personalized learning paths, Offline content access, Gamification system, Progress tracking, Social learning features, AR/VR integration.',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'Firebase', 'TensorFlow Lite', 'MongoDB', 'WebRTC'],
      features: [
        'AI-powered personalization',
        'Offline learning mode',
        'Gamification system',
        'Social learning features'
      ],
      metrics: {
        users: '25K+',
        rating: '4.8/5',
        retention: '75%'
      },
      duration: '10 tháng',
      team: '5 người',
      demoUrl: '#',
      githubUrl: '#',
      status: 'Production'
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
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
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
                <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
                  {Object.entries(project.metrics).map(([key, value], mIndex) => (
                    <div key={mIndex} className="text-center">
                      <div className="text-2xl font-bold text-sky-600">{value}</div>
                      <div className="text-gray-600 text-sm capitalize">{key}</div>
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