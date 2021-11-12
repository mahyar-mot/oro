import Home from "../public/home";
import Login from "../login/login";
import OverseersList from "../overseers/overseersList";
import AddOverSeer from "../overseers/addOverSeer";
import EditOverseer from "../overseers/editOverseer";
import AddExcelOverSeer from "../overseers/addExcelOverseer";
import ValidateExcelOverseers from "../overseers/validateExcelOverseer";
import OverSeerDashboard from "../dashboard/overseerDash";
import AdminsList from "../admins/adminsList";
import AddAdmin from "../admins/addAdmin";
import EditAdmin from "../admins/editAdmin";
import ContentsList from "../contents/contentsList";
import AddContent from "../contents/addContent";
import EditContent from "../contents/editContent";
import ContentDetail from "../contents/contentDetail";
import ContentViewers from "../contents/contentViewers";
import NewUserForm from "../newUser/newUserForm";
import NotFound404 from "../public/NotFound404";
import WaitingUser from "../newUser/waitingUser";
import CategoriesList from "../categories/categoriesList";
import AddCategory from "../categories/addCategories";
import EditCategory from "../categories/editCategories";
import Complaints from "../complaint";
import NewComplaint from "../complaint/new";
import SingleComplaint from "../complaint/singleComplaint";
import ListComplaint from "../listComplaint";
import ComplaintDetail from "../listComplaint/detail";
import ListCandidate from "../candidate";
import CandidateDetail from "../candidate/detail";
import ListReports from "../reports";
import Cartable from "../cartable";
import ViolationList from "../violation";
import AllViolationList from "../violation/allIndex";
import PeopleViolationList from "../violation/peopleIndex";
import InspectorViolationList from "../violation/inspectorIndex";
import addViolation from "../violation/new";
import DetailViolation from "../violation/detail";
import MonitoringViolation from "../monitoring/violation";
import MonitoringOverseer from "../monitoring/overseer";
import MonitoringContent from "../monitoring/content";
import MonitoringOverseerTable from "../monitoring/overseerReport";
import PicturizeViolation from "../picturize";
import BranchesList from "../branches/branchesList";
import BranchDetail from "../branches/branchesDetail";
import AddBranch from "../branches/addBranches";
// import RollCall from "../branches/rollCall";
import BlockedUsersList from "../blockedUsers/blockedUsersList";
import BlockedInspectorsList from "../blockedUsers/blockedInspectors";
import AllTicketsList from "../ticketing/allList";
import MyTicketsList from "../ticketing/myList";
import AddTicket from "../ticketing/create";
import TicketDetail from "../ticketing/detail";
import Cart from "../cart/";
import CartPrint from "../cart/print";
import DownloadFilesList from "../downloadFiles/downloadFilesList";
import InspectorsList from "../inspectors/inspectorsList";
import AddInspector from "../inspectors/addInspector";
import EditInspector from "../inspectors/editInspector";
import HeadOverseersList from "../headOverseers/headOverseersList";
import AddHeadOverseer from "../headOverseers/create";
// import HeadOverseerDetail from "../headOverseers/detail";
import InspectorMonitoringReport from "../monitoring/inspectorReport"
import RollcallBranchesList from "../rollcalls/rollcallList"
import RollCall from "../rollcalls/detail";
import BranchInspectorsList from "../branchInspectors/branchInspectorsList";
import AddBranchInspector from "../branchInspectors/create";
import AllProceedingsList from "../proceedings/allList";
import ProceedingDetail from "../proceedings/detail";
import AddProceeding from "../proceedings/create";
// import Reports from "../overseerReport/reportPage";
// import ProjectTabs from "../project/projectTabs";
// import CreateProject from "../project/createProject";
// import SubjectManage from "../subjects/subjectManage";
// import SubjectForm from "../subjects/subjectForm";
// import SubjectProfile from "../subjects/subjectProfile";
// import TagPost from "../tag/tagPost";
// import TagCreate from "../tag/tagCreate";
// import FavoritismCreate from "../subjects/favoritismManage";
// import UsersList from "../users/usersList";
import SignInOidc from "../login/signin_oidc";
// import ComplaintUser from "../newUser/complaintUser";
import ComplaintUser from "../newUser/violationUser";
import ProtestSuccess from "../newUser/protestSuccess";


export default [
    { path: "/", name: "سامانه", Component: Home, loginRequired: false },
    { path: "/login", name: "ورود", Component: Login, loginRequired: false },
    { path: "/signin-oidc", name: "ورود", Component: SignInOidc, loginRequired: false },
    { path: "/notfound", name: "", Component: NotFound404, loginRequired: false },
    { path: "/waitinguser", name: "در حال بررسی", Component: WaitingUser, loginRequired: true },
    { path: "/profile", name: "اطلاعات کاربری", Component: WaitingUser, loginRequired: true },
    { path: "/profile/edit/:nationalNo(\\d+)", name: "ویرایش اطلاعات کاربری", Component: NewUserForm, loginRequired: true },
    { path: "/overseers", name: "ناظران", Component: OverseersList, loginRequired: true, requiredRoles:["1.1"] },
    { path: "/overseers/add", name: "افزودن دستی ناظران", Component: AddOverSeer, loginRequired: true, requiredRoles:["1.1", "1.3"] },
    { path: "/overseers/update/:nationalNo(\\d+)", name: "ویرایش ناظر", Component: EditOverseer, loginRequired: true, requiredRoles:["1.1", "1.2", "1.3"] },
    { path: "/overseers/excel", name: "افزودن ناظران از اکسل", Component: AddExcelOverSeer, loginRequired: true, requiredRoles:["1.1", "1.3"] },
    { path: "/overseers/excelvalidate", name: "ویرایش اکسل", Component: ValidateExcelOverseers, loginRequired: true, requiredRoles:[] },
    { path: "/dashboard", name: "کاربر جدید", Component: OverSeerDashboard, loginRequired: true },
    { path: "/admins", name: "مدیریت ادمین‌ها", Component: AdminsList, loginRequired: true, requiredRoles:["1.4", "1.6"] },
    { path: "/admins/add", name: "مشخصات ادمین", Component: EditAdmin, loginRequired: true, requiredRoles:["1.4", "1.5", "1.6"] },
    { path: "/admins/edit/:nationalNo(\\d+)", name: "ویرایش ادمین", Component: EditAdmin, loginRequired: true, requiredRoles:["1.4", "1.5", "1.6"] },
    { path: "/contents", name: "لیست محتواها", Component: ContentsList, loginRequired: true, requiredRoles:["2.3"] },
    { path: "/contents/add", name: "ایجاد محتوا", Component: AddContent, loginRequired: true, requiredRoles:["2.1", "2.8"] },
    { path: "/contents/detail/:id(\\d+)", name: "جزییات محتوا", Component: ContentDetail, loginRequired: true, requiredRoles:["2.3", "2.2"] },
    { path: "/contents/edit/:id(\\d+)", name: "ویرایش محتوا", Component: EditContent, loginRequired: true, requiredRoles:["2.3", "2.2"] },
    { path: "/contents/viewers/:id(\\d+)", name: "لیست مشاهده کنندگان", Component: ContentViewers, loginRequired: true, requiredRoles:["2.3", "2.6", "2.7"] },
    { path: "/categories", name: "دسته‌بندی محتواها", Component: CategoriesList, loginRequired: true, requiredRoles:["2.8"] },
    { path: "/categories/add", name: " ایجاد دسته‌بندی محتواها", Component: AddCategory, loginRequired: true, requiredRoles:["2.8", "2.9", "2.11"] },
    { path: "/categories/edit/:id(\\d+)", name: " ویرایش دسته‌بندی محتوا", Component: EditCategory, loginRequired: true, requiredRoles:["2.8", "2.9", "2.10", "2.11", "2.12", "2.13"] },
    { path: "/newUser/:nationalNo(\\d+)", name: "ثبت اطلاعات کاربر", Component: NewUserForm, loginRequired: true },
    { path: "/complaints", name: "اعتراضات", Component: Complaints, loginRequired: true },
    { path: "/complaints/add", name: "ثبت  اعتراضات", Component: NewComplaint, loginRequired: true },
    { path: "/complaints/detail/:id(\\d+)", name: "مشاهده  اعتراض", Component: SingleComplaint, loginRequired: true },
    { path: "/list-complaints", name: "لیست  شکایات", Component: ListComplaint, loginRequired: true, requiredRoles:["3.1"] },
    { path: "/list-complaints/detail/:id(\\d+)", name: "جزیات شکایت", Component: ComplaintDetail, loginRequired: true, requiredRoles:["3.1", "3.2"] },
    { path: "/candidates", name: "لیست  داوطلبان", Component: ListCandidate, loginRequired: true, requiredRoles:["4.1"] },
    { path: "/candidates/detail/:id(\\d+)", name: "جزیات داوطلب", Component: CandidateDetail, loginRequired: true, requiredRoles:["4.1", "4.2", "4.4"] },
    { path: "/reports", name: "لیست   گزارشات", Component: ListReports, loginRequired: true, requiredRoles: ["1.8"] },
    { path: "/cartable", name: "کارتابل", Component: Cartable, loginRequired: true },
    { path: "/user/protest", name: "ثبت اعتراض", Component: ComplaintUser, loginRequired: false },
    { path: "/user/protest/success", name: "ثبت اعتراض", Component: ProtestSuccess, loginRequired: false },
    { path: "/violations", name: " لیست تخلفات", Component: ViolationList, loginRequired: true },
    { path: "/allviolations", name: " لیست تخلفات ناظران", Component: AllViolationList, loginRequired: true, requiredRoles: ["5.1"] },
    { path: "/peopleviolations", name: " لیست تخلفات مردمی", Component: PeopleViolationList, loginRequired: true, requiredRoles: ["5.8"] },
    { path: "/inspectorviolations", name: " لیست تخلفات بازرسان", Component: InspectorViolationList, loginRequired: true, requiredRoles: ["5.13"] },
    { path: "/violations/add/:id", name: " ثبت تخلفات", Component: addViolation, loginRequired: true },
    { path: "/violations/detail/:id(\\d+)", name: "جزیات تخلف", Component: DetailViolation, loginRequired: true },
    { path: "/monitoring/violations", name: " مانیتورینگ تخلفات", Component: MonitoringViolation, loginRequired: true, requiredRoles: ["5.11"] },
    { path: "/monitoring/overseers", name: " مانیتورینگ ناظران", Component: MonitoringOverseer, loginRequired: true, requiredRoles: ["1.7"] },
    { path: "/monitoring/content/:id(\\d+)", name: " مانیتورینگ محتوا", Component: MonitoringContent, loginRequired: true, requiredRoles: ["2.14"] },
    { path: "/monitoring/overseers/table", name: "جدول مانیتورینگ  ناظران", Component: MonitoringOverseerTable, loginRequired: true, requiredRoles: ["1.10"] },
    { path: "/monitoring/inspectors/table", name: "جدول مانیتورینگ  بازرسان", Component: InspectorMonitoringReport, loginRequired: true, requiredRoles: ["1.25"] },
    { path: "/picturize/violation", name: "مانیتورینگ تصویری تخلفات", Component: PicturizeViolation, loginRequired: true, requiredRoles: ["5.12"] },
    { path: "/branches", name: " لیست شعب ", Component: BranchesList, loginRequired: true, requiredRoles: ["7.1"] },
    { path: "/branches/detail/:id(\\d+)", name: " جزیات شعبه ", Component: BranchDetail, loginRequired: true, requiredRoles: ["7.2"] },
    { path: "/branches/add", name: " افزودن کاربر به شعبه ", Component: AddBranch, loginRequired: true, requiredRoles: ["7.4"] },
    { path: "/branches/edit/:id(\\d+)", name: " ویرایش شعبه ", Component: AddBranch, loginRequired: true, requiredRoles: ["7.4"] },
    { path: "/blockedusers", name: " لیست ناظران مسدودی‌ ", Component: BlockedUsersList, loginRequired: true, requiredRoles: ["1.9"] },
    { path: "/blockedinspectors", name: " لیست بازرسان مسدودی ", Component: BlockedInspectorsList, loginRequired: true, requiredRoles: ["1.9"] },
    { path: "/tickets", name: " لیست تیکت‌ها ", Component: AllTicketsList, loginRequired: true, requiredRoles: ["6.1"] },
    { path: "/mytickets", name: " لیست تیکت‌ کاربران ", Component: MyTicketsList, loginRequired: true, requiredRoles: [] },
    { path: "/tickets/add", name: " ثبت تیکت‌ها ", Component: AddTicket, loginRequired: true, requiredRoles: ["6.2"] },
    { path: "/tickets/detail/:id(\\d+)", name: " لیست تیکت‌ها ", Component: TicketDetail, loginRequired: true, requiredRoles: [] },
    { path: "/carts", name: " چاپ کارت ", Component: Cart, loginRequired: true, requiredRoles: ["1.3"] },
    { path: "/carts/print", name: " چاپ کارت ", Component: CartPrint, loginRequired: true, requiredRoles: [] },
    { path: "/downloads", name: " لیست دانلودها ", Component: DownloadFilesList, loginRequired: true, requiredRoles: [] },
    { path: "/inspectors", name: "بازرسان", Component: InspectorsList, loginRequired: true, requiredRoles:["1.21"] },
    { path: "/inspectors/add", name: "افزودن بازرس", Component: AddInspector, loginRequired: true, requiredRoles:[] },
    { path: "/inspectors/update/:nationalNo(\\d+)", name: "ویرایش بازرس", Component: EditInspector, loginRequired: true, requiredRoles:[] },
    { path: "/headoverseers", name: "سرناظران", Component: HeadOverseersList, loginRequired: true, requiredRoles:["7.6"] },
    { path: "/headoverseers/add", name: "افزودن سرناظر جدید", Component: AddHeadOverseer, loginRequired: true, requiredRoles:["7.5"] },
    // { path: "/headoverseers/detail/:nationalNo(\\d+)", name: "ویرایش سرناظر", Component: EditInspector, loginRequired: true, requiredRoles:[] },
    { path: "/branchinspectors", name: "بازرسان شعب", Component: BranchInspectorsList, loginRequired: true, requiredRoles:["7.20"] },
    { path: "/branchinspectors/add", name: "افزودن بازرس شعبه جدید", Component: AddBranchInspector, loginRequired: true, requiredRoles:["7.21"] },
    // { path: "/branchinspectors/detail/:nationalNo(\\d+)", name: "ویرایش بازرس شعبه", Component: EditInspector, loginRequired: true, requiredRoles:[] },
    { path: "/rollcalls", name: " لیست شعب ", Component: RollcallBranchesList, loginRequired: true, requiredRoles: ["7.10"] },
    { path: "/rollcalls/branch/:id(\\d+)", name: " حضور و غیاب ", Component: RollCall, loginRequired: true, requiredRoles: [] },
    { path: "/proceedings", name: "لیست صورتجلسات" , Component: AllProceedingsList, loginRequired: true, requiredRoles: ["8.1"]},
    { path: "/proceedings/add", name: "آپلود صورتجلسه", Component: AddProceeding, loginRequired: true, requiredRoles: ["8.4"]},
    { path: "/proceedings/detail/:id(\\d+)", name: "جزیات صورتجلسه", Component: ProceedingDetail, loginRequired: true, requiredRoles: []},
    // { path: "/signin-oidc", name: "ورود", Component: SignInOidc },
    // { path: "/manage", name: "مدیریت", Component: Home },
    // { path: "/manage/subject", name: "مدیریت سوژه ها", Component: SubjectManage },
    // { path: "/manage/subject/profile/:subjectId", name: "پروفایل سوژه", Component: SubjectProfile },
    // { path: "/manage/subjects", name: "ساخت سوژه", Component: SubjectForm },
    // { path: "/manage/subjects/edit/:subjectId(\\d+)", name: "ویرایش سوژه", Component: SubjectForm },
    // { path: "/manage/project", name: "مدیریت پروژه‌ها", Component: CreateProject },
    // { path: "/manage/project/edit/:projectId(\\d+)", name: "ویرایش پروژه", Component: CreateProject },
    // { path: "/manage/tags", name: "مدیریت تگ ها", Component: TagCreate},
    // { path: "/manage/favoritism", name: "مدیریت ویژگی‌ها", Component: FavoritismCreate},
    // { path: "/manage/users", name: "مدیریت کاربران", Component: UsersList},
    // { path: "/view/project", name: "پروژه‌ها", Component: ProjectTabs },
    // { path: "/overseerReport", name: "گزارش ها", Component: Reports },
    // { path: "/view/tag", name: "تگ پست ها", Component: TagPost},
];
