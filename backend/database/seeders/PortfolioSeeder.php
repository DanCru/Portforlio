<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PortfolioSetting;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Project;
use App\Models\Certification;

class PortfolioSeeder extends Seeder
{
    public function run()
    {
        try {
            // 1. Portfolio Settings
            $settings = [
                ['key' => 'hero_title', 'value' => 'Web Developer', 'type' => 'text', 'group' => 'hero'],
                ['key' => 'hero_subtitle', 'value' => 'Sinh viên năm 3 ngành Công nghệ thông tin, đam mê phát triển phần mềm và xây dựng sản phẩm thực tế.', 'type' => 'text', 'group' => 'hero'],
                ['key' => 'about_name', 'value' => 'Nguyễn Anh Đức', 'type' => 'text', 'group' => 'about'],
                ['key' => 'about_description', 'value' => 'Tôi là sinh viên năm 3 ngành Công nghệ thông tin với niềm đam mê mãnh liệt về lập trình.', 'type' => 'text', 'group' => 'about'],
                ['key' => 'contact_email', 'value' => 'nguyenanhduc@example.com', 'type' => 'text', 'group' => 'contact'],
            ];

            foreach ($settings as $setting) {
                PortfolioSetting::updateOrCreate(['key' => $setting['key']], $setting);
            }

            // 2. Experiences
            Experience::truncate();
            $experiences = [
                [
                    'position' => 'Junior Full Stack Developer',
                    'company' => 'Công ty ABC',
                    'location' => 'Thanh Hóa',
                    'period' => '2025 - PRESENT',
                    'description' => 'Phát triển và bảo trì các ứng dụng web cho khách hàng doanh nghiệp.',
                    'achievements' => [
                        'Tham gia phát triển các tính năng mới cho hệ thống quản lý',
                        'Tối ưu hóa performance và fix bugs',
                        'Học hỏi và áp dụng best practices từ senior developers'
                    ],
                    'technologies' => ['React', 'Node.js', 'MySQL', 'Git'],
                    'rank' => 'DIAMOND 1',
                    'sort_order' => 1,
                    'is_active' => true
                ],
                [
                    'position' => 'Intern Developer',
                    'company' => 'Công ty XYZ',
                    'location' => 'Thanh Hóa',
                    'period' => '2024 - 2025',
                    'description' => 'Thực tập và học hỏi quy trình phát triển phần mềm thực tế.',
                    'achievements' => [
                        'Hoàn thành các task được giao đúng deadline',
                        'Xây dựng các component UI theo design',
                        'Viết unit tests và documentation'
                    ],
                    'technologies' => ['JavaScript', 'React', 'CSS', 'Git'],
                    'rank' => 'GOLD 3',
                    'sort_order' => 2,
                    'is_active' => true
                ],
                [
                    'position' => 'Freelancer',
                    'company' => 'Dự án cá nhân',
                    'location' => 'Remote',
                    'period' => '2023 - 2024',
                    'description' => 'Nhận và hoàn thành các dự án nhỏ cho khách hàng cá nhân.',
                    'achievements' => [
                        'Xây dựng landing pages và website giới thiệu',
                        'Tạo các ứng dụng web đơn giản theo yêu cầu',
                        'Học cách giao tiếp và làm việc với khách hàng'
                    ],
                    'technologies' => ['HTML', 'CSS', 'JavaScript', 'React'],
                    'rank' => 'SILVER 2',
                    'sort_order' => 3,
                    'is_active' => true
                ]
            ];

            foreach ($experiences as $exp) {
                Experience::create($exp);
            }

            // 3. Skills
            Skill::truncate();
            $skills = [
                ['category' => 'Frontend', 'name' => 'React/Next.js', 'proficiency' => 90, 'icon' => 'Cpu', 'sort_order' => 1, 'is_active' => true],
                ['category' => 'Frontend', 'name' => 'Vue.js/Nuxt.js', 'proficiency' => 85, 'icon' => 'Cpu', 'sort_order' => 2, 'is_active' => true],
                ['category' => 'Frontend', 'name' => 'TypeScript', 'proficiency' => 88, 'icon' => 'Cpu', 'sort_order' => 3, 'is_active' => true],
                ['category' => 'Frontend', 'name' => 'Tailwind CSS', 'proficiency' => 95, 'icon' => 'Cpu', 'sort_order' => 4, 'is_active' => true],
                
                ['category' => 'Backend', 'name' => 'Node.js', 'proficiency' => 85, 'icon' => 'Server', 'sort_order' => 5, 'is_active' => true],
                ['category' => 'Backend', 'name' => 'Python', 'proficiency' => 70, 'icon' => 'Server', 'sort_order' => 6, 'is_active' => true],
                ['category' => 'Backend', 'name' => 'Laravel/PHP', 'proficiency' => 75, 'icon' => 'Server', 'sort_order' => 7, 'is_active' => true],
                ['category' => 'Backend', 'name' => 'Express.js', 'proficiency' => 85, 'icon' => 'Server', 'sort_order' => 8, 'is_active' => true],

                ['category' => 'Database', 'name' => 'PostgreSQL', 'proficiency' => 80, 'icon' => 'Database', 'sort_order' => 9, 'is_active' => true],
                ['category' => 'Database', 'name' => 'MongoDB', 'proficiency' => 85, 'icon' => 'Database', 'sort_order' => 10, 'is_active' => true],
                ['category' => 'Database', 'name' => 'Redis', 'proficiency' => 70, 'icon' => 'Database', 'sort_order' => 11, 'is_active' => true],
                ['category' => 'Database', 'name' => 'MySQL', 'proficiency' => 85, 'icon' => 'Database', 'sort_order' => 12, 'is_active' => true],

                ['category' => 'DevOps/Cloud', 'name' => 'AWS', 'proficiency' => 70, 'icon' => 'Cloud', 'sort_order' => 13, 'is_active' => true],
                ['category' => 'DevOps/Cloud', 'name' => 'Docker', 'proficiency' => 80, 'icon' => 'Cloud', 'sort_order' => 14, 'is_active' => true],
                ['category' => 'DevOps/Cloud', 'name' => 'Kubernetes', 'proficiency' => 60, 'icon' => 'Cloud', 'sort_order' => 15, 'is_active' => true],
                ['category' => 'DevOps/Cloud', 'name' => 'CI/CD', 'proficiency' => 75, 'icon' => 'Cloud', 'sort_order' => 16, 'is_active' => true],
            ];

            foreach ($skills as $skill) {
                Skill::create($skill);
            }

            // 4. Educations
            Education::truncate();
            $educations = [
                [
                    'degree' => 'Bachelor of IT',
                    'school' => 'University [Name]',
                    'period' => '2024 - PRESENT',
                    'gpa' => 'IN PROGRESS',
                    'description' => 'Major in Software Engineering. Focused on scalable systems and algorithms.',
                    'image' => 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'sort_order' => 1,
                    'is_active' => true
                ],
                [
                    'degree' => 'Associate Degree',
                    'school' => 'FPT Polytechnic',
                    'period' => '2021 - 2024',
                    'gpa' => 'DISTINCTION',
                    'description' => 'Graduated with honors. Specialized in Web Development application.',
                    'image' => 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400',
                    'sort_order' => 2,
                    'is_active' => true
                ]
            ];

            foreach ($educations as $edu) {
                Education::create($edu);
            }

            // 5. Projects
            Project::truncate();
            $projects = [
                [
                    'title' => 'Portfolio Website',
                    'category' => 'Personal Project',
                    'description' => 'Website portfolio cá nhân được xây dựng với React và TypeScript, tích hợp dark mode và đa ngôn ngữ.',
                    'long_description' => 'Dự án showcase kỹ năng frontend với responsive design, animations mượt mà, và SEO optimization.',
                    'image' => 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'tech_stack' => ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
                    'features' => ['Dark/Light mode toggle', 'Đa ngôn ngữ (VI/EN)', 'Responsive design', 'Smooth animations'],
                    'metrics' => ['pages' => '6+', 'performance' => '90+ Lighthouse', 'responsive' => '100%'],
                    'duration' => '2 tuần',
                    'team' => '1 người',
                    'status' => 'Live',
                    'sort_order' => 1,
                    'is_active' => true
                ],
                [
                    'title' => 'Task Management App',
                    'category' => 'Full Stack Project',
                    'description' => 'Ứng dụng quản lý công việc với đầy đủ tính năng CRUD, authentication và real-time updates.',
                    'long_description' => 'Dự án học tập để practice full stack development với React frontend và Node.js backend.',
                    'image' => 'https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'tech_stack' => ['React', 'Node.js', 'Express', 'MongoDB'],
                    'features' => ['User authentication', 'CRUD tasks', 'Filter search', 'Responsive UI'],
                    'metrics' => ['features' => '10+', 'apis' => '8', 'tests' => '20+'],
                    'duration' => '1 tháng',
                    'team' => '1 người',
                    'status' => 'Completed',
                    'sort_order' => 2,
                    'is_active' => true
                ],
                [
                    'title' => 'E-commerce Landing Page',
                    'category' => 'Freelance Project',
                    'description' => 'Landing page cho cửa hàng online với thiết kế hiện đại và tối ưu conversion.',
                    'long_description' => 'Dự án freelance đầu tiên, làm việc trực tiếp với khách hàng.',
                    'image' => 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'tech_stack' => ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
                    'features' => ['Product showcase', 'Contact form', 'Mobile-first', 'SEO optimized'],
                    'metrics' => ['sections' => '5', 'loadTime' => '2s', 'mobile' => '100%'],
                    'duration' => '1 tuần',
                    'team' => '1 người',
                    'status' => 'Delivered',
                    'sort_order' => 3,
                    'is_active' => true
                ],
                [
                    'title' => 'Weather App',
                    'category' => 'Learning Project',
                    'description' => 'Ứng dụng tra cứu thời tiết với API integration và clean UI design.',
                    'long_description' => 'Dự án học tập để hiểu cách làm việc với APIs.',
                    'image' => 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
                    'tech_stack' => ['React', 'OpenWeather API', 'CSS Modules'],
                    'features' => ['City search', 'Real-time weather', '5-day forecast', 'Responsive'],
                    'metrics' => ['cities' => 'Unlimited', 'apiCalls' => 'Real-time', 'accuracy' => '100%'],
                    'duration' => '1 tuần',
                    'team' => '1 người',
                    'status' => 'Completed',
                    'sort_order' => 4,
                    'is_active' => true
                ]
            ];

            foreach ($projects as $proj) {
                Project::create($proj);
            }

            // 6. Certifications
            Certification::truncate();
            $certs = [
                ['name' => 'JS Algorithms', 'issuer' => 'freeCodeCamp', 'sort_order' => 1, 'is_active' => true],
                ['name' => 'Responsive Web', 'issuer' => 'freeCodeCamp', 'sort_order' => 2, 'is_active' => true],
                ['name' => 'React Guide', 'issuer' => 'Udemy', 'sort_order' => 3, 'is_active' => true],
                ['name' => 'Git Bootcamp', 'issuer' => 'Udemy', 'sort_order' => 4, 'is_active' => true],
            ];

            foreach ($certs as $cert) {
                Certification::create($cert);
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Seeder Failed: ' . $e->getMessage());
            $this->command->error('Seeder Failed: ' . $e->getMessage());
        }
    }
}
