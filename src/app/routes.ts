import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { MobileLayout } from './components/layout/MobileLayout';
import { GuardianLayout } from './components/layout/GuardianLayout';
import { CoordinatorLayout } from './components/layout/CoordinatorLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { VillageLayout } from './components/layout/VillageLayout';
import { HomeRouter } from './pages/home/HomeRouter';
import { CampPage } from './pages/camp/CampPage';
import { CheckHub } from './pages/check/CheckHub';
import { MindCheck } from './pages/check/MindCheck';
import { StressResult } from './pages/check/StressResult';
import { BrainCheck } from './pages/check/BrainCheck';
import { PlayCheck } from './pages/check/PlayCheck';
import { SleepDetail } from './pages/check/SleepDetail';
import { TodayRecommend } from './pages/check/TodayRecommend';
import { ReportPage } from './pages/report/ReportPage';
import { MorePage } from './pages/more/MorePage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { RoleSelectPage } from './pages/onboarding/RoleSelectPage';
import { DetailSpecPage } from './pages/library/DetailSpecPage';
import { CopyLibraryPage } from './pages/library/CopyLibraryPage';
import { StateLibraryPage } from './pages/library/StateLibraryPage';
import { AIRecoRuleSpecPage } from './pages/library/AIRecoRuleSpecPage';
import { AIRecoScenariosPage } from './pages/library/AIRecoScenariosPage';
import { AIRecoReasonMappingPage } from './pages/library/AIRecoReasonMappingPage';
import { AIRecoPseudocodePage } from './pages/library/AIRecoPseudocodePage';
import { AIRecoJSONPage } from './pages/library/AIRecoJSONPage';
// Daily activity flow
import { TodayPlanPage } from './pages/daily/TodayPlanPage';
import { ActivityDetailPage } from './pages/daily/ActivityDetailPage';
import { ActivityProgressPage } from './pages/daily/ActivityProgressPage';
import { ActivityCompletePage } from './pages/daily/ActivityCompletePage';
import { YouTubeQueryPage } from './pages/daily/YouTubeQueryPage';
import { YouTubeResultsPage } from './pages/daily/YouTubeResultsPage';
import { FoodIdeasPage } from './pages/daily/FoodIdeasPage';
import { WeeklyInsightPage } from './pages/daily/WeeklyInsightPage';
import { QueryTemplateLibrary } from './pages/daily/QueryTemplateLibrary';
// Camp flow
import { BaselineChecklistPage } from './pages/camp/BaselineChecklistPage';
import { MeasurementGatePage } from './pages/camp/MeasurementGatePage';
import { ReportLoadingPage } from './pages/camp/ReportLoadingPage';
import { ReportExportPage } from './pages/camp/ReportExportPage';
// Coordinator (legacy)
import { CoordinatorHome } from './pages/coordinator/CoordinatorHome';
import { ReportChecklist } from './pages/coordinator/ReportChecklist';
import { NoticeTemplate } from './pages/coordinator/NoticeTemplate';
// Coordinator v2 (Ops OS)
import { CoordCampSelect } from './pages/coordinator/CoordCampSelect';
import { CoordHome } from './pages/coordinator/CoordHome';
import { CoordSessions } from './pages/coordinator/CoordSessions';
import { CoordCheckReport } from './pages/coordinator/CoordCheckReport';
import { CoordParticipants } from './pages/coordinator/CoordParticipants';
import { CoordParticipantDetail } from './pages/coordinator/CoordParticipantDetail';
import { CoordIssues } from './pages/coordinator/CoordIssues';
import { CoordAlerts } from './pages/coordinator/CoordAlerts';
import { CoordSettings } from './pages/coordinator/CoordSettings';
// Guardian
import { GuardianHome } from './pages/guardian/GuardianHome';
import { GuardianTrends } from './pages/guardian/GuardianTrends';
import { GuardianRiskDetail } from './pages/guardian/GuardianRiskDetail';
import { GuardianReport } from './pages/guardian/GuardianReport';
import { GuardianPrograms } from './pages/guardian/GuardianPrograms';
import { GuardianInquiry } from './pages/guardian/GuardianInquiry';
import { GuardianConsent } from './pages/guardian/GuardianConsent';
import { GuardianSettings } from './pages/guardian/GuardianSettings';
import { GuardianAccessExpired } from './pages/guardian/GuardianAccessExpired';
// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminParticipants } from './pages/admin/AdminParticipants';
import { AdminPrograms } from './pages/admin/AdminPrograms';
import { AdminProgramDetail } from './pages/admin/AdminProgramDetail';
import { AdminMenu } from './pages/admin/AdminMenu';
import { AdminMenuDetail } from './pages/admin/AdminMenuDetail';
import { AdminRooms } from './pages/admin/AdminRooms';
import { AdminMore } from './pages/admin/AdminMore';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminDataStats } from './pages/admin/AdminDataStats';
import { AdminCheckReview } from './pages/admin/AdminCheckReview';
// Explore (NORMAL_MODE)
import { ExplorePage } from './pages/explore/ExplorePage';
import { VillageDetailPage } from './pages/explore/VillageDetailPage';
import { ProgramDetailPage } from './pages/explore/ProgramDetailPage';
import { BookingPage } from './pages/explore/BookingPage';
import { MyBookingsPage } from './pages/explore/MyBookingsPage';
// Village (VILLAGE_MODE — 참가자)
import { VillageEntrance } from './pages/village/VillageEntrance';
import { ParticipationSelect } from './pages/village/ParticipationSelect';
import { ParticipationHistory } from './pages/village/ParticipationHistory';
import { VillageDashboard } from './pages/village/VillageDashboard';
import { VillageSchedule } from './pages/village/VillageSchedule';
import { VillageMeal } from './pages/village/VillageMeal';
import { VillageRoom } from './pages/village/VillageRoom';
import { VillageNotices } from './pages/village/VillageNotices';
import { VillageInquiry } from './pages/village/VillageInquiry';
import { VillageCompletion } from './pages/village/VillageCompletion';
// Elder mode (어르신 모드)
import { ElderLayout } from './components/layout/ElderLayout';
import { ElderHome } from './pages/elder/ElderHome';
import { ElderCheck } from './pages/elder/ElderCheck';
import { ElderReport } from './pages/elder/ElderReport';
import { ElderExplore } from './pages/elder/ElderExplore';
import { ElderMore } from './pages/elder/ElderMore';
// Referral
import { ReferralCategoryList } from './pages/referral/ReferralCategoryList';
import { PreVisitChecklist } from './pages/referral/PreVisitChecklist';
import { FollowUpCheck } from './pages/referral/FollowUpCheck';
// Help
import { HelpPage } from './pages/more/HelpPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      // Onboarding / Role selection
      { path: 'onboarding', Component: OnboardingPage },
      { path: 'select-role', Component: RoleSelectPage },

      // === Participant (NORMAL_MODE default mobile layout) ===
      {
        path: '/',
        Component: MobileLayout,
        children: [
          { index: true, Component: HomeRouter },
          { path: 'camp', Component: CampPage },
          { path: 'check', Component: CheckHub },
          { path: 'check/mind', Component: MindCheck },
          { path: 'check/stress', Component: StressResult },
          { path: 'check/brain', Component: BrainCheck },
          { path: 'check/play', Component: PlayCheck },
          { path: 'check/sleep', Component: SleepDetail },
          { path: 'check/recommend', Component: TodayRecommend },
          { path: 'report', Component: ReportPage },
          { path: 'more', Component: MorePage },
          // Explore (N2~N6)
          { path: 'explore', Component: ExplorePage },
          { path: 'explore/village/:villageId', Component: VillageDetailPage },
          { path: 'explore/program/:programId', Component: ProgramDetailPage },
          { path: 'explore/booking/:programId', Component: BookingPage },
          { path: 'explore/bookings', Component: MyBookingsPage },
          // Daily activity flow
          { path: 'daily/plan', Component: TodayPlanPage },
          { path: 'daily/activity/:activityId', Component: ActivityDetailPage },
          { path: 'daily/progress/:activityId', Component: ActivityProgressPage },
          { path: 'daily/complete/:activityId', Component: ActivityCompletePage },
          { path: 'daily/youtube-query', Component: YouTubeQueryPage },
          { path: 'daily/youtube-results', Component: YouTubeResultsPage },
          { path: 'daily/query-templates', Component: QueryTemplateLibrary },
          { path: 'daily/food', Component: FoodIdeasPage },
          { path: 'daily/weekly-insight', Component: WeeklyInsightPage },
          // Camp flow
          { path: 'camp/baseline', Component: BaselineChecklistPage },
          { path: 'camp/measurement-gate', Component: MeasurementGatePage },
          { path: 'camp/report-loading', Component: ReportLoadingPage },
          { path: 'camp/report-export', Component: ReportExportPage },
          // Coordinator (legacy within mobile layout)
          { path: 'coordinator', Component: CoordinatorHome },
          { path: 'coordinator/report-checklist', Component: ReportChecklist },
          { path: 'coordinator/notice-template', Component: NoticeTemplate },
          // Referral
          { path: 'referral/categories', Component: ReferralCategoryList },
          { path: 'referral/pre-visit', Component: PreVisitChecklist },
          { path: 'referral/follow-up', Component: FollowUpCheck },
          // Help
          { path: 'help', Component: HelpPage },
          // Library
          { path: 'library/detail-spec', Component: DetailSpecPage },
          { path: 'library/copy', Component: CopyLibraryPage },
          { path: 'library/states', Component: StateLibraryPage },
          { path: 'library/ai-reco-rules', Component: AIRecoRuleSpecPage },
          { path: 'library/ai-reco-scenarios', Component: AIRecoScenariosPage },
          { path: 'library/ai-reco-reason-mapping', Component: AIRecoReasonMappingPage },
          { path: 'library/ai-reco-pseudocode', Component: AIRecoPseudocodePage },
          { path: 'library/ai-reco-json', Component: AIRecoJSONPage },
        ],
      },

      // === VILLAGE_MODE (참가자 마을 전용) ===
      {
        path: 'village',
        Component: VillageLayout,
        children: [
          { index: true, Component: VillageDashboard },
          { path: 'schedule', Component: VillageSchedule },
          { path: 'meal', Component: VillageMeal },
          { path: 'room', Component: VillageRoom },
          { path: 'notices', Component: VillageNotices },
          { path: 'inquiry', Component: VillageInquiry },
        ],
      },
      // Village standalone pages (no bottom tabs)
      { path: 'village/entrance', Component: VillageEntrance },
      { path: 'village/select', Component: ParticipationSelect },
      { path: 'village/history', Component: ParticipationHistory },
      { path: 'village/completion', Component: VillageCompletion },

      // === Guardian layout ===
      {
        path: 'guardian',
        Component: GuardianLayout,
        children: [
          { index: true, Component: GuardianHome },
          { path: 'trends', Component: GuardianTrends },
          { path: 'risk', Component: GuardianRiskDetail },
          { path: 'report', Component: GuardianReport },
          { path: 'programs', Component: GuardianPrograms },
          { path: 'inquiry', Component: GuardianInquiry },
          { path: 'consent', Component: GuardianConsent },
          { path: 'settings', Component: GuardianSettings },
          { path: 'alerts', Component: GuardianRiskDetail },
          { path: 'access-expired', Component: GuardianAccessExpired },
        ],
      },

      // === Coordinator v2 (Ops OS) ===
      {
        path: 'coord',
        Component: CoordinatorLayout,
        children: [
          { index: true, Component: CoordHome },
          { path: 'camp-select', Component: CoordCampSelect },
          { path: 'sessions', Component: CoordSessions },
          { path: 'check-report', Component: CoordCheckReport },
          { path: 'participants', Component: CoordParticipants },
          { path: 'participant-detail', Component: CoordParticipantDetail },
          { path: 'issues', Component: CoordIssues },
          { path: 'issues/create', Component: CoordIssues },
          { path: 'alerts', Component: CoordAlerts },
          { path: 'record', Component: CoordParticipantDetail },
          { path: 'escalate', Component: CoordIssues },
          { path: 'guardian-inquiries', Component: CoordIssues },
          { path: 'settings', Component: CoordSettings },
        ],
      },

      // === Admin Console (내 마을 고정) ===
      {
        path: 'admin',
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: 'participants', Component: AdminParticipants },
          { path: 'programs', Component: AdminPrograms },
          { path: 'programs/detail', Component: AdminProgramDetail },
          { path: 'menu', Component: AdminMenu },
          { path: 'menu/detail', Component: AdminMenuDetail },
          { path: 'rooms', Component: AdminRooms },
          { path: 'more', Component: AdminMore },
          { path: 'bookings', Component: AdminBookings },
          { path: 'data-stats', Component: AdminDataStats },
          { path: 'check-review', Component: AdminCheckReview },
          { path: 'analytics', Component: AdminDashboard },
        ],
      },

      // === Elder mode (어르신 모드) ===
      {
        path: 'elder',
        Component: ElderLayout,
        children: [
          { index: true, Component: ElderHome },
          { path: 'check', Component: ElderCheck },
          { path: 'report', Component: ElderReport },
          { path: 'explore', Component: ElderExplore },
          { path: 'more', Component: ElderMore },
        ],
      },
    ],
  },
]);