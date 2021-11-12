module.exports = {

    //MESSAGES
    SUCCESS_MESSAGE : "عملیات با موفقیت انجام شد",
    ERROR_MESSAGE: "با خطا همراه بود",
    CONFLICT_MESSAGE: "مشکلی به وجود آمده است",
    SUPPORT_TEL: "02139936390",
    SUPPORT_TEL_VIEW: "021-39936390",

    // ROUTES
    BASE_URL: "https://electiongateway.netbean.ir/api/v1",
    // BASE_URL: "https://appnew.netbean.ir/api/v1",
    MEDIA_URL: "https://sso.netbean.ir/ResourceManager/api/v1",
    // MEDIA_URL: "https://shoraelection.parliran.ir/ResourceManager/api/v1",
    // MEDIA_URL: "https://appnew.netbean.ir/ResourceManager/api/v1",
    // BASE_URL: "https://shoraelection.parliran.ir/ElectionRest/api/v1",
    // SSO_SERVER: "https://shorausers.parliran.ir",
    // BASE_URL: "https://idp.vs-code.ir/apigateway/api/v1", // AFRANET
    // MEDIA_URL: "https://idp.vs-code.ir/resourcemanager/api/v1", //AFRANET

    PREFIX:"",

    // SSO_SERVER: "https://idp.vs-code.ir", //AFRANET
    // SSO_LOGIN_REDIRECT: "https://front.vs-code.ir/login", //AFRANET

    SSO_SERVER: "https://sso.netbean.ir/sso",
    SSO_LOGIN_REDIRECT: "https://front.netbean.ir/login",
    // SSO_LOGIN_REDIRECT: `http://172.16.188.147:3000/login`,
    // SSO_LOGIN_REDIRECT: `http://192.168.0.161:3000/login`,

    SUPERVISOR_EXCEL_SAMPLE: "https://shoraelection.parliran.ir/ElectionResourceManager/Resources/Excels/لیست ناظران.xlsx",

    // USER_PROFILE: nationalNo => `/Profile/GetByNationalNo?NationalNo=${nationalNo}`,
    SUPERVISOR_LIST: "/Supervisor",
    CARTS_LIST: "/Cart",
    SUPERVISOR_DETAIL: (nationalNo) => `/Supervisor/${nationalNo}`,
    SUPERVISOR_EXCEL: countryCode => `Supervisor/Bulk/${countryCode}`,
    SUPERVISOR_EXCEL_VALIDATION: countryCode => `Supervisor/ExcelUsers/${countryCode}`,
    SUPERVISOR_EXCEL_INSERT: countryCode => `Supervisor/ExcelInsert/${countryCode}`,
    SUPERVISOR_ACTIVATION: (nationalNo) => `/Supervisor/${nationalNo}/Activation`,
    SUPERVISOR_RESEND_SMS: (nationalNo) => `/Supervisor/${nationalNo}/ResendInvitation`,
    SUPERVISOR_EXPORT: "/Supervisor/Export",
    SUPERVISOR_EXPORT_PDF: "/Supervisor/PdfExport",
    SUPERVISOR_SUSPEND_LIST: "/Supervisor/SuspendActivation",
    SUPERVISOR_SUSPEND_CANCEL: nationalNo => `/Supervisor/${nationalNo}/SuspendActivation`,
    MONITORING_OVERSEER: (countryCode) => `/Supervisor/ReportHierarchical/${countryCode}`,
    SUPERVISOR_MANAGEMENT_APPROVAL: nationalNo => `/Supervisor/${nationalNo}/SetManagementApproval`,
    MONITORING_REPORT_OVERSEER: (countryCode) => `/Supervisor/ReportDensityByCDC/${countryCode}`,
    MONITORING_REPORT_OVERSEER_EXPORT: (countryCode) => `/Supervisor/ExportReportDensityByCDC/${countryCode}`,
    MONITORING_REPORT_OVERSEER_PDFEXPORT: (countryCode) => `/Supervisor/PdfExportReportDensityByCDC/${countryCode}`,
    MONITORING_VIOLATION: (countryCode) => `/Violation/ViolationReport/${countryCode}`,

    MONITORING_CONTENT:  `/ContentCreation/ContentInDivisions`,
    COUNTRY_DETAIL: id => `/CountryDivision/${id}`,
    COUNTRY_DIVISIONS: parentId => `/CountryDivision/FilteredChildren/${parentId}`,
    COUNTRY_DIVISIONS_ALL: parentId => `/CountryDivision/DirectChildren/${parentId}`,
    COUNTRY_DIVISIONS_ZONES: parentId => `/CountryDivision/FilteredChildrenIncludZone/${parentId}`,
    USER_PROFILE: nationalNo => `/Registration/${nationalNo}`,
    USER_REGISTRATION: nationalNo => `/Registration/${nationalNo}`,
    BASIC_INFORMATION: "/BasicInformation/BasicInformation",
    EXCEL_UPLOAD: "/Resources/Excel",
    IMAGE_UPLOAD: nationalNo => `/Resources/Image/${nationalNo}`,
    CATEGORIES_LIST: "/Category",
    CATEGORIES_DETAIL: (id) => `/Category/${id}`,
    CATEGORIES_CHILDS: (id) => `/Category/${id}/parent`,
    CONTENTS_LIST: "/ContentCreation",
    CONTENTS_COUNT: "/Dashboard",
    CONTENTS_DETAIL: id => `/ContentCreation/${id}`,
    CONTENTS_CREATE: "/ContentCreation",
    CONTENTS_IMAGE_UPLOAD: "/Resources/ContentCreationImage",
    CONTENTS_ATTACH_UPLOAD: "/Resources/ContentCreationAttachments",
    CONTENTS_VIEWER: id => `/ContentViewer/${id}`,

    USER_COMPLAINTS_LIST: "/Complaint/GetByUser",
    USER_COMPLAINTS_DETAIL: id => `/Complaint/${id}/Get`,
    COMPLAINTS_LIST: "/Complaint/Filter",
    COMPLAINTS_COMMENTS: id => `/Complaint/${id}/GetComments`,
    COMPLAINTS_ATTACHMENTS: id => `/Complaint/${id}/GetAttachments`,
    COMPLAINTS_CREATE: "/Complaint/Add",
    COMPLAINTS_UPDATE: "/Complaint/Update",
    COMPLAINTS_STATUS: id => `/Complaint/${id}/SetStatus`,
    COMPLAINTS_CREATE_COMMENT: "/Complaint/AddComment",
    COMPLAINTS_CREATE_ATTACHMENT: "/Complaint/AddAttachment",
    COMPLAINTS_ATTACHMENTS_UPLOAD: nationalNo => `/Resources/${nationalNo}/ComplaintAttachments`,

    PROTESTS_LIST: "/Protest/Filter",
    PROTESTS_DETAIL: id => `/Protest/${id}/Get/`,
    PROTESTS_ATTACHMENTS: "/Resources/ProtestAttachments",
    PROTEST_CREATE: "/Protest/Add",
    PROTEST_COMMENT: "/Protest/AddComment",
    PROTEST_SETSTATUS: id => `/Protest/${id}/SetStatus`,

    CANDIDATES_LIST: "/Candidate/Filter",
    CANDIDATES_DETAIL: id => `/Candidate/${id}/Get`,
    CANDIDATES_DOCUMENTS: nationalNo => `/Resources/${nationalNo}/PostCandidateDocuments`,
    CANDIDATES_UPDATE: "/Candidate/Update",
    CANDIDATES_ADD: "/Candidate/Add",

    VIOLATION_LIST: "/Violation",
    UPDATE_VIOLATION:id => `/Violation/${id}`,
    MY_VIOLATION_LIST:(id)=> `/Violation/${id}/List`,
    VIOLATION_DETAIL: id => `/Violation/${id}`,
    VIOLATION_FILES: id => `/ViolationFiles/${id}`,
    VIOLATION_COMMENTS: id => `/ViolationComment/${id}`,
    VIOLATION_TYPES:  `/ViolationType`,
    GET_VIOLATION_UPDATE:  (id)=> `/Violation/${id}/update`,
    VIOLATION_ATTACHMENTS_UPLOAD: `/Resources/ViolationAttachments`,
    PEOPLE_VIOLATION_LIST: "/PeopleViolation",
    PEOPLE_VIOLATION_DETAIL: id => `/PeopleViolation/${id}`,
    PEOPLE_VIOLATION_ATTACHMENTS: "/Resources/PeopleViolationAttachments",
    PEOPLE_VIOLATION_COMMENT: id => `/PeopleViolationComment/${id}`,
    PEOPLE_VIOLATION_FILES: id => `/PeopleViolationFiles/${id}`,
    VIOLATION_IMAGE_REPORT: id => `/Violation/ViolationImagesReport/${id}`,
    VIOLATION_IMAGES: id => `/Violation/ViolationImages/${id}`,
    INSPECTOR_VIOLATION_LIST: "/Violation/Inspectors",

    OVERSEER_REPORTS: "/ProfileStatus/ConfirmedOrRejectedUsers",

    ADMINS_LIST: "/Admin",
    ADMINS_CREATE: countryDivisionCode => `/Admin/${countryDivisionCode}`,
    ROLES_LIST: "/Admin/Role/1/50", //pagination
    USER_ROLES_CREATE: nationalNo => `/Admin/Role/${nationalNo}/UserRoles`,
    ADMIN_DETAIL: nationalNo => `/Admin/${nationalNo}`,
    ADMIN_DETAIL_SEARCH: nationalNo => `/Admin/Search/${nationalNo}`,
    ADMIN_DETAIL_ROLE: nationalNo => `/Admin/Role/${nationalNo}`, 

    DASHBOARD: "/Dashboard",

    TICKETS_LIST: "/Ticket",
    TICKETS_DETAIL: id =>`/Ticket/${id}`,
    MYTICKETS_LIST: nationalNo => `/Ticket/${nationalNo}/tickets`,
    REPLY_TICKET: "/RepliedTicket",

    DOWNLOAD_FILES_LIST: "/FileStorage",

    INSPECTOR_LIST: "/Inspector",
    INSPECTOR_DETAIL: (nationalNo) => `/Inspector/${nationalNo}`,
    INSPECTOR_EXCEL: countryCode => `Inspector/Bulk/${countryCode}`,
    INSPECTOR_ACTIVATION: (nationalNo) => `/Inspector/${nationalNo}/Activation`,
    INSPECTOR_RESEND_SMS: (nationalNo) => `/Inspector/${nationalNo}/ResendInvitation`,
    INSPECTOR_SUSPENDED_LIST: "/Inspector/SuspendActivation",
    INSPECTOR_SUSPENDED_CANCEL: nationalNo => `/Inspector/${nationalNo}/SuspendActivation`,
    INSPECTOR_MONITORING_REPORT: (countryCode) => `/Inspector/ReportDensityByCDC/${countryCode}`,
    INSPECTOR_REPORT_EXCEL: "/Inspector/Export",
    INSPECTOR_REPORT_PDF: "/Inspector/PdfExport",
    INSPECTOR_MONITORING_REPORT_EXPORT: (countryCode) => `/Inspector/ExportReportDensityByCDC/${countryCode}`,
    INSPECTOR_MONITORING_REPORT_PDFEXPORT: (countryCode) => `/Inspector/PdfExportReportDensityByCDC/${countryCode}`,

    BRANCH_LIST: "/Branch/Filter",
    BRANCH_DETAIL: id => `/Branch/${id}/Get`,
    BRANCH_ADD: "/Branch/Add",
    BRANCH_UPDATE: id => `/Branch/${id}/Update`,
    BRANCH_ROLLCALL_LIST: nationalNo => `/Branch/${nationalNo}/GetBranchesForRollCall`,
    BRANCH_ROLLCALL_DETAIL: id => `/Branch/${id}/RollCall`,
    BRANCH_ROLLCALL_UPDATE: "/Branch/RollCall",
    BRANCH_OVERSEER: nationalNo => `/Branch/${nationalNo}`,
    BRANCH_EXCEL_EXPORT: "/Branch/Export",

    HEADSUPERVISOR_SEARCH: (countryCode) => `/BranchHeadSupervisor/Search/${countryCode}`,
    HEADSUPERVISOR_LIST: "/BranchHeadSupervisor/Filter",
    HEADSUPERVISOR_BRANCHES_LIST: nationalNo => `/BranchHeadSupervisor/SupervisorBranches/${nationalNo}`,
    HEADSUPERVISOR_CREATE: "/BranchHeadSupervisor/SupervisorBranches",

    BRANCHINSPECTORS_SEARCH: (countryCode) => `/BranchInspector/Search/${countryCode}`,
    BRANCHINSPECTORS_LIST: "/BranchInspector/Filter",
    BRANCHINSPECTORS_BRANCHES_LIST: nationalNo => `/BranchInspector/InspectorBranches/${nationalNo}`,
    BRANCHINSPECTORS_CREATE: "/BranchInspector/InspectorBranches",

    PROCEEDINGS_LIST: "/Proceeding",
    PROCEEDINGS_DETAIL: id => `/Proceeding/${id}`,
    PROCEEDINGS_FILES: id => `/ProceedingFiles/${id}`,
    PROCEEDINGS_UPLOAD: "/Resources/ProceedingAttachments",

    // PARAMS:
    COOKIE_EXPIRES: 1 // IN DAYS

};
