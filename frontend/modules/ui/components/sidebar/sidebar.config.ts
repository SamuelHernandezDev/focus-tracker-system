//frontend\modules\ui\components\sidebar\sidebar.config.ts
import { LayoutDashboard, BarChart3, Clock, PlayCircle } from 'lucide-react';

export const appLinks = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
  },
  {
    href: '/dashboard/sessions',
    label: 'Sessions',
    icon: Clock,
  },
];

export const actionLinks = [
  {
    href: '/focus',
    label: 'Start Focus',
    icon: PlayCircle,
  },
];
