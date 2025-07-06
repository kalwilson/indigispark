import {
  HomePage,
  BrandTypeStep,
  PromptStep,
  NameStep,
  AestheticStep,
  SummaryPage,
  AboutPage,
} from '../pages';

export const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/brand-type', element: <BrandTypeStep /> },
  { path: '/prompts', element: <PromptStep /> },
  { path: '/names', element: <NameStep /> },
  { path: '/aesthetic', element: <AestheticStep /> },
  { path: '/summary', element: <SummaryPage /> },
  { path: '/about', element: <AboutPage /> },
];
