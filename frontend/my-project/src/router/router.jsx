import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Gallery from '../pages/Gallery';
import EventDetails from '../pages/EventDetails';
import Notices from '../pages/Notices';
import Teachers from '../pages/about/Teachers';
import Committee from '../pages/about/Committee';
import UniversalPdfViewer from '../pages/UniversalPdfViewer';
import NotFound from '../pages/NotFound';

// Admin imports
import AdminLayout from '../components/admin/AdminLayout';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import NoticeList from '../pages/admin/notices/NoticeList';
import NoticeCreate from '../pages/admin/notices/NoticeCreate';
import NoticeEdit from '../pages/admin/notices/NoticeEdit';
import EventList from '../pages/admin/events/EventList';
import EventCreate from '../pages/admin/events/EventCreate';
import EventEdit from '../pages/admin/events/EventEdit';

import TickerSettings from '../pages/admin/settings/TickerSettings';
import ManagePages from '../pages/admin/ManagePages';
import ManageTeachers from '../pages/admin/ManageTeachers';
import ManageCommittee from '../pages/admin/ManageCommittee';

const dynamicRoutes = [
  { path: '/admission-info', pageKey: 'admission_info' },
  { path: '/stipend-info', pageKey: 'stipend_info' },
  { path: '/admission-register', pageKey: 'admission_register' },
  { path: '/find-student', pageKey: 'find_student' },
  { path: '/book-distribution', pageKey: 'book_distribution' },
  { path: '/child-survey', pageKey: 'child_survey' },
  { path: '/dropout-info', pageKey: 'dropout_info' },
  { path: '/special-needs', pageKey: 'special_needs' },
  { path: '/stipend/list', pageKey: 'stipend_list' },
  { path: '/stipend/class-update', pageKey: 'stipend_class_update' },
  { path: '/stipend/demand/jan-jun-2023', pageKey: 'stipend_demand_jan_jun_2023' },
  { path: '/stipend/demand/jul-dec-2023', pageKey: 'stipend_demand_jul_dec_2023' },
  { path: '/stipend/demand/jan-jun-2024', pageKey: 'stipend_demand_jan_jun_2024' },
  { path: '/stipend/payroll/jul-dec-2021', pageKey: 'stipend_payroll_jul_dec_2021' },
  { path: '/stipend/payroll/jan-jun-2022', pageKey: 'stipend_payroll_jan_jun_2022' },
  { path: '/stipend/payroll/jul-dec-2022', pageKey: 'stipend_payroll_jul_dec_2022' },
  { path: '/stipend/payroll/jan-jun-2023', pageKey: 'stipend_payroll_jan_jun_2023' },
  { path: '/stipend/payroll/jul-dec-2023', pageKey: 'stipend_payroll_jul_dec_2023' },
  { path: '/stipend/payroll/jan-jun-2024', pageKey: 'stipend_payroll_jan_jun_2024' },
  { path: '/teacher-info', pageKey: 'teacher_info' },
  { path: '/home-visit', pageKey: 'home_visit' },
  { path: '/casual-leave', pageKey: 'casual_leave' },
  { path: '/class-observation', pageKey: 'class_observation' },
  { path: '/movement', pageKey: 'movement' },
  { path: '/training-info', pageKey: 'training_info' },
  { path: '/duty-distribution', pageKey: 'duty_distribution' },
  { path: '/daily-lesson', pageKey: 'daily_lesson' },
  { path: '/lesson-study', pageKey: 'lesson_study' },
  { path: '/academic-supervision', pageKey: 'academic_supervision' },
  { path: '/teachers-acr/grade-10-12', pageKey: 'teachers_acr_grade_10_12' },
  { path: '/teachers-acr/grade-13-16', pageKey: 'teachers_acr_grade_13_16' },
  { path: '/exam-schedule', pageKey: 'exam_schedule' },
  { path: '/terminal-evaluation-1-3', pageKey: 'terminal_evaluation_1_3' },
  { path: '/practical-evaluation-4-5', pageKey: 'practical_evaluation_4_5' },
  { path: '/may-grade-promotion', pageKey: 'may_grade_promotion' },
  { path: '/completion-info', pageKey: 'completion_info' },
  { path: '/certificate', pageKey: 'certificate' },
  { path: '/student-letter', pageKey: 'student_letter' },
  { path: '/reading-skills', pageKey: 'reading_skills' },
  { path: '/pi-list/first-grade', pageKey: 'pi_list_first_grade' },
  { path: '/pi-list/second-grade', pageKey: 'pi_list_second_grade' },
  { path: '/pi-list/third-grade', pageKey: 'pi_list_third_grade' },
  { path: '/history', pageKey: 'history' },
  { path: '/headmaster', pageKey: 'headmaster' },
  { path: '/headmaster', pageKey: 'headmaster' },
  { path: '/school-info', pageKey: 'school_info' },
  { path: '/school-info', pageKey: 'school_info' },
  { path: '/school-gazette', pageKey: 'school_gazette' },
  { path: '/teacher-gazette', pageKey: 'teacher_gazette' },
  { path: '/head-teachers-list', pageKey: 'head_teachers_list' },
  { path: '/register/inspection', pageKey: 'register_inspection' },
  { path: '/register/stock', pageKey: 'register_stock' },
  { path: '/register/slip', pageKey: 'register_slip' },
  { path: '/register/minor-repair', pageKey: 'register_minor_repair' },
  { path: '/register/income-expense', pageKey: 'register_income_expense' },
  { path: '/register/materials', pageKey: 'register_materials' },
  { path: '/register/event', pageKey: 'register_event' },
  { path: '/mr/jan-feb', pageKey: 'mr_jan_feb' },
  { path: '/mr/feb-mar', pageKey: 'mr_feb_mar' },
  { path: '/mr/mar-apr', pageKey: 'mr_mar_apr' },
  { path: '/mr/apr-may', pageKey: 'mr_apr_may' },
  { path: '/mr/may-jun', pageKey: 'mr_may_jun' },
  { path: '/mr/jun-jul', pageKey: 'mr_jun_jul' },
  { path: '/mr/jul-aug', pageKey: 'mr_jul_aug' },
  { path: '/mr/aug-sep', pageKey: 'mr_aug_sep' },
  { path: '/mr/sep-oct', pageKey: 'mr_sep_oct' },
  { path: '/mr/oct-nov', pageKey: 'mr_oct_nov' },
  { path: '/mr/nov-dec', pageKey: 'mr_nov_dec' },
  { path: '/mr/dec-jan', pageKey: 'mr_dec_jan' },
  { path: '/apa/2023', pageKey: 'apa_2023' },
  { path: '/apa/2024', pageKey: 'apa_2024' },
  { path: '/terminal-evaluation/first', pageKey: 'terminal_evaluation_first' },
  { path: '/terminal-evaluation/second', pageKey: 'terminal_evaluation_second' },
  { path: '/terminal-evaluation/third', pageKey: 'terminal_evaluation_third' },
  { path: '/terminal-evaluation/fourth', pageKey: 'terminal_evaluation_fourth' },
  { path: '/terminal-evaluation/fifth', pageKey: 'terminal_evaluation_fifth' },
  { path: '/continuous-evaluation/first', pageKey: 'continuous_evaluation_first' },
  { path: '/continuous-evaluation/second', pageKey: 'continuous_evaluation_second' },
  { path: '/continuous-evaluation/third', pageKey: 'continuous_evaluation_third' },
  { path: '/continuous-evaluation/fourth', pageKey: 'continuous_evaluation_fourth' },
  { path: '/continuous-evaluation/fifth', pageKey: 'continuous_evaluation_fifth' },
  { path: '/completion-exam-info', pageKey: 'completion_exam_info' },
  { path: '/scholarship-exam-info', pageKey: 'scholarship_exam_info' },
  { path: '/achievements/national', pageKey: 'achievements_national' },
  { path: '/achievements/international', pageKey: 'achievements_international' },
  { path: '/land-info', pageKey: 'land_info' },
  { path: '/annual-work-plan', pageKey: 'annual_work_plan' },
  { path: '/routine', pageKey: 'routine' },
  { path: '/inter-sports', pageKey: 'inter_sports' },
  { path: '/holiday-list-2024', pageKey: 'holiday_list_2024' },
  { path: '/misc-forms', pageKey: 'misc_forms' },
  { path: '/scholarship-exam', pageKey: 'scholarship_exam' },
  { path: '/electricity-bill', pageKey: 'electricity_bill' },
  { path: '/vouchers', pageKey: 'vouchers' },
  { path: '/urc-related', pageKey: 'urc_related' },
  { path: '/managing-committee', pageKey: 'managing_committee' },
  { path: '/pta', pageKey: 'pta' },
  { path: '/slip-committee', pageKey: 'slip_committee' },
  { path: '/sac-committee', pageKey: 'sac_committee' },
  { path: '/student-council', pageKey: 'student_council' },
  { path: '/minor-doctor-team', pageKey: 'minor_doctor_team' },
  { path: '/kabdol', pageKey: 'kabdol' },
  { path: '/smc-resolution', pageKey: 'smc_resolution' },
  { path: '/pta-resolution', pageKey: 'pta_resolution' },
  { path: '/slip-resolution', pageKey: 'slip_resolution' },
  { path: '/sac-resolution', pageKey: 'sac_resolution' },
  { path: '/mothers-assembly', pageKey: 'mothers_assembly' },
  { path: '/guardians-assembly', pageKey: 'guardians_assembly' },
  { path: '/courtyard-meeting', pageKey: 'courtyard_meeting' },
  { path: '/staff-meeting', pageKey: 'staff_meeting' },
  { path: '/student-council-resolution', pageKey: 'student_council_resolution' },
  { path: '/minor-doctor-resolution', pageKey: 'minor_doctor_resolution' },
  { path: '/textbook', pageKey: 'textbook' },
  { path: '/teachers-guide', pageKey: 'teachers_guide' },
  { path: '/pre-primary/annual-plan', pageKey: 'pre_primary_annual_plan' },
  { path: '/pre-primary/weekly-routine', pageKey: 'pre_primary_weekly_routine' },
  { path: '/pre-primary/evaluation-5plus', pageKey: 'pre_primary_evaluation_5plus' },
  { path: '/pre-primary/certificate', pageKey: 'pre_primary_certificate' },
  { path: '/pre-primary/inspection-form', pageKey: 'pre_primary_inspection_form' },
  { path: '/pre-primary/guide-4plus', pageKey: 'pre_primary_guide_4plus' },
  { path: '/pre-primary/guide-5plus', pageKey: 'pre_primary_guide_5plus' },
  { path: '/pre-primary/4plus/annual-plan', pageKey: 'pre_primary_4plus_annual_plan' },
  { path: '/pre-primary/4plus/routine', pageKey: 'pre_primary_4plus_routine' },
  { path: '/pre-primary/4plus/evaluation', pageKey: 'pre_primary_4plus_evaluation' },
  { path: '/pre-primary/4plus/guide', pageKey: 'pre_primary_4plus_guide' },
  { path: '/pre-primary/4plus/inspection', pageKey: 'pre_primary_4plus_inspection' },
  { path: '/pre-primary/5plus/annual-plan', pageKey: 'pre_primary_5plus_annual_plan' },
  { path: '/pre-primary/5plus/routine', pageKey: 'pre_primary_5plus_routine' },
  { path: '/pre-primary/5plus/evaluation', pageKey: 'pre_primary_5plus_evaluation' },
  { path: '/pre-primary/5plus/guide', pageKey: 'pre_primary_5plus_guide' },
  { path: '/pre-primary/5plus/inspection', pageKey: 'pre_primary_5plus_inspection' },
  { path: '/curriculum/first', pageKey: 'curriculum_first' },
  { path: '/curriculum/second', pageKey: 'curriculum_second' },
  { path: '/curriculum/third', pageKey: 'curriculum_third' },
  { path: '/curriculum/fourth', pageKey: 'curriculum_fourth' },
  { path: '/curriculum/fifth', pageKey: 'curriculum_fifth' },
  { path: '/curriculum/science/third', pageKey: 'curriculum_science_third' },
  { path: '/curriculum/science/fourth', pageKey: 'curriculum_science_fourth' },
  { path: '/curriculum/science/fifth', pageKey: 'curriculum_science_fifth' },
  { path: '/gallery/wall-magazine/21-february', pageKey: 'gallery_wall_magazine_21_february' },
  { path: '/gallery/wall-magazine/26-march', pageKey: 'gallery_wall_magazine_26_march' },
  { path: '/gallery/institutional', pageKey: 'gallery_institutional' },
  { path: '/gallery/primary-education', pageKey: 'gallery_primary_education' },
  { path: '/gallery/day-celebrations', pageKey: 'gallery_day_celebrations' },
  { path: '/gallery/teachers', pageKey: 'gallery_teachers' },
  { path: '/gallery/others', pageKey: 'gallery_others' },
  { path: '/gallery/miscellaneous/slide', pageKey: 'gallery_miscellaneous_slide' },
  { path: '/tools/matriola-drawing', pageKey: 'tools_matriola_drawing' },
  { path: '/tools/calculator', pageKey: 'tools_calculator' },
  { path: '/tools/bmi-calculator', pageKey: 'tools_bmi_calculator' },
  { path: '/tools/dictionary', pageKey: 'tools_dictionary' },
  { path: '/tools/countdown', pageKey: 'tools_countdown' },
  { path: '/tools/stopwatch', pageKey: 'tools_stopwatch' },
  { path: '/tools/todo-list', pageKey: 'tools_todo_list' },
  { path: '/tools/qr-code', pageKey: 'tools_qr_code' },
  { path: '/tools/quiz', pageKey: 'tools_quiz' },
  { path: '/tools/scientific-calculator', pageKey: 'tools_scientific_calculator' },
  { path: '/tools/drawing', pageKey: 'tools_drawing' },
  { path: '/tools/flip-text', pageKey: 'tools_flip_text' },
];
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/gallery/:id',
        element: <EventDetails />,
      },
      {
        path: '/notices',
        element: <Notices />,
      },
      {
        path: '/teachers',
        element: <Teachers />,
      },
      {
        path: '/committee',
        element: <Committee />,
      },
      // Dynamic Routes
      ...dynamicRoutes.map(route => ({
        path: route.path,
        element: <UniversalPdfViewer pageKey={route.pageKey} />
      })),
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  // Admin Routes
  {
    path: '/secure-panel/login',
    element: <Login />,
  },
  {
    path: '/secure-panel',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'notices',
        element: <NoticeList />,
      },
      {
        path: 'notices/create',
        element: <NoticeCreate />,
      },
      {
        path: 'notices/edit/:id',
        element: <NoticeEdit />,
      },
      {
        path: 'events',
        element: <EventList />,
      },
      {
        path: 'events/create',
        element: <EventCreate />,
      },
      {
        path: 'events/edit/:id',
        element: <EventEdit />,
      },
      {
        path: 'settings/ticker',
        element: <TickerSettings />,
      },
      {
        path: 'pages',
        element: <ManagePages />,
      },
      {
        path: 'teachers',
        element: <ManageTeachers />,
      },
      {
        path: 'committee',
        element: <ManageCommittee />,
      },
    ],
  },
]);
