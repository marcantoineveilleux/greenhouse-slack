export interface application_updated_response {
    action: string;
    payload: Payload;
  }
  export interface Payload {
    application: Application;
  }
  export interface Application {
    id: number;
    rejected_at?: null;
    prospect: boolean;
    prospect_detail: ProspectDetail;
    status: string;
    applied_at: string;
    last_activity_at: string;
    url: string;
    source: Source;
    credited_to: CreditedTo;
    rejection_reason?: null;
    rejection_details?: null;
    current_stage: CurrentStage;
    custom_fields: CustomFields;
    candidate: Candidate;
    jobs?: (JobsEntity)[] | null;
  }
  export interface ProspectDetail {
    prospect_owner?: null;
    prospect_pool?: null;
    prospect_stage?: null;
  }
  export interface Source {
    id: number;
    name: string;
  }
  export interface CreditedTo {
    id: number;
    email: string;
    name: string;
    employee_id: string;
  }
  export interface CurrentStage {
    id: number;
    name: string;
    interviews?: (InterviewsEntity)[] | null;
  }
  export interface InterviewsEntity {
    id: number;
    name: string;
    status: string;
    interview_kit: InterviewKit;
    interviewers?: (InterviewersEntity)[] | null;
  }
  
  export interface InterviewersEntity {
    id: number;
    display_name: string;
    status: string;
  }
  export interface CustomFields {
    custom_application_field: CustomApplicationField;
  }
  export interface CustomApplicationField {
    name: string;
    type: string;
    value: string;
  }

  export interface PhoneNumbersEntityOrEmailAddressesEntityOrWebsiteAddressesEntity {
    value: string;
    type: string;
  }
  export interface SocialMediaAddressesEntity {
    value: string;
  }
  export interface CustomFields1 {
    current_salary: CurrentSalaryOrDesiredSalary;
    desired_salary: CurrentSalaryOrDesiredSalary;
  }
  export interface CurrentSalaryOrDesiredSalary {
    name: string;
    type: string;
    value?: null;
  }

  export interface candidate_stage_change_response {
    action: string;
    payload: Payload;
  }
  export interface Payload {
    application: Application;
  }
  export interface Application {
    id: number;
    rejected_at?: null;
    prospect: boolean;
    status: string;
    applied_at: string;
    last_activity_at: string;
    url: string;
    source: Source;
    credited_to: User;
    rejection_reason?: null;
    rejection_details?: null;
    current_stage: CurrentStage;
    custom_fields: CustomFields;
    candidate: Candidate;
    jobs?: (JobsEntity)[] | null;
  }
  export interface Source {
    id: number;
    name: string;
  }
  export interface User {
    id: number;
    email: string;
    name: string;
    employee_id: string;
  }
  export interface CurrentStage {
    id: number;
    name: string;
    interviews?: (InterviewsEntity)[] | null;
  }
  export interface InterviewsEntity {
    id: number;
    name: string;
    status: string;
    interview_kit: InterviewKit;
    interviewers?: (InterviewersEntity)[] | null;
  }

  export interface InterviewersEntity {
    id: number;
    display_name: string;
    status: string;
  }
  export interface CustomFields {
    custom_application_field: CustomApplicationFieldOrFavoriteColorOrEmploymentType;
  }
  export interface CustomApplicationFieldOrFavoriteColorOrEmploymentType {
    name: string;
    type: string;
    value: string;
  }
  export interface Candidate {
    id: number;
    first_name: string;
    last_name: string;
    title?: string;
    company?: string;
    created_at: string;
    external_id?: string;
    photo_url: string;
    url: string;
    is_private: boolean;
    can_email: boolean;
    phone_numbers?: (ValueType)[] | null;
    email_addresses?: (ValueType)[] | null;
    addresses?: (ValueType)[] | null;
    website_addresses?: (ValueType)[] | null;
    social_media_addresses?: (SocialMediaAddressesEntity)[] | null;
    educations?: (EducationsEntity)[] | null;
    employments?: (EmploymentsEntity)[] | null;
    recruiter: User;
    coordinator: User;
    attachments?: (AttachmentsEntity)[] | null;
    tags?: (string)[] | null;
    custom_fields: CustomFields1;
  }
  export interface ValueType {
    value: string;
    type: string;
  }
  export interface SocialMediaAddressesEntity {
    value: string;
  }
  export interface EducationsEntity {
    school_name: string;
    degree: string;
    discipline: string;
    start_date: string;
    end_date: string;
  }
  export interface EmploymentsEntity {
    company_name: string;
    title: string;
    start_date: string;
    end_date: string;
  }
  export interface AttachmentsEntity {
    filename: string;
    url: string;
    type: string;
  }
  export interface CustomFields1 {
    favorite_color: CustomApplicationFieldOrFavoriteColorOrEmploymentType;
  }
  export interface JobsEntity {
    id: number;
    name: string;
    requisition_id: string;
    notes?: string;
    job_post_id: number;
    status: string;
    created_at: string;
    opened_at: string;
    closed_at?: null;
    departments?: (DepartmentsEntity)[] | null;
    offices?: (OfficesEntity)[] | null;
    custom_fields: CustomFields2;
  }
  export interface DepartmentsEntity {
    id: number;
    name: string;
    external_id: string;
  }
  export interface OfficesEntity {
    id: number;
    name: string;
    location: string;
    external_id: string;
  }
  export interface CustomFields2 {
    employment_type: CustomApplicationFieldOrFavoriteColorOrEmploymentType;
  }

  export interface new_candidate_application_response {
    action: string;
    payload: Payload;
  }
  export interface Payload {
    application: Application;
  }
  export interface Application {
    id: number;
    rejected_at?: null;
    prospect: boolean;
    status: string;
    applied_at: string;
    last_activity_at: string;
    url: string;
    source: Source;
    credited_to: RecruiterOrCoordinatorOrCreditedTo;
    rejection_reason?: null;
    rejection_details?: null;
    current_stage: CurrentStage;
    prospect_detail: ProspectDetail;
    custom_fields: CustomFields;
    candidate: Candidate;
    jobs?: (JobsEntity)[] | null;
  }
  export interface Source {
    id: number;
    name: string;
  }
  export interface RecruiterOrCoordinatorOrCreditedTo {
    id: number;
    email: string;
    name: string;
    employee_id: string;
  }
  export interface CurrentStage {
    id: number;
    name: string;
    interviews?: (InterviewsEntity)[] | null;
  }
  export interface InterviewsEntity {
    id: number;
    name: string;
    status: string;
    interview_kit: InterviewKit;
    interviewers?: (InterviewersEntity)[] | null;
  }
  export interface InterviewKit {
    url: string;
    content: string;
    questions?: (QuestionsEntity)[] | null;
  }
  export interface QuestionsEntity {
    id: number;
    question: string;
  }
  export interface InterviewersEntity {
    id: number;
    display_name: string;
    status: string;
  }
  export interface ProspectDetail {
    prospect_pool?: null;
    prospect_stage?: null;
    prospect_owner?: null;
  }
  export interface CustomFields {
    application_custom_test: ApplicationCustomTestOrCustomBooleanTestOrDesiredSalaryOrGraduationYear1OrWorkRemotely;
    custom_boolean_test: ApplicationCustomTestOrCustomBooleanTestOrDesiredSalaryOrGraduationYear1OrWorkRemotely;
  }
  export interface ApplicationCustomTestOrCustomBooleanTestOrDesiredSalaryOrGraduationYear1OrWorkRemotely {
    name: string;
    type: string;
    value?: null;
  }

  export interface PhoneNumbersEntityOrEmailAddressesEntityOrAddressesEntityOrWebsiteAddressesEntity {
    value: string;
    type: string;
  }
  export interface SocialMediaAddressesEntity {
    value: string;
  }
  export interface EducationsEntity {
    school_name: string;
    degree: string;
    discipline: string;
    start_date: string;
    end_date: string;
  }
  export interface AttachmentsEntity {
    filename: string;
    url: string;
    type: string;
  }
  export interface CustomFields1 {
    date_test: DateTestOrEmploymentTypeOrTestField1;
    desired_salary: ApplicationCustomTestOrCustomBooleanTestOrDesiredSalaryOrGraduationYear1OrWorkRemotely;
    graduation_year_1: ApplicationCustomTestOrCustomBooleanTestOrDesiredSalaryOrGraduationYear1OrWorkRemotely;
    work_remotely: ApplicationCustomTestOrCustomBooleanTestOrDesiredSalaryOrGraduationYear1OrWorkRemotely;
  }
  export interface DateTestOrEmploymentTypeOrTestField1 {
    name: string;
    type: string;
    value: string;
  }
  export interface JobsEntity {
    id: number;
    name: string;
    requisition_id: string;
    notes?: string;
    job_post_id: number;
    status: string;
    created_at: string;
    opened_at: string;
    closed_at?: null;
    url: string;
    departments?: (DepartmentsEntity)[] | null;
    offices?: (OfficesEntity)[] | null;
    hiring_team: HiringTeam;
    custom_fields: CustomFields2;
  }
  export interface DepartmentsEntity {
    id: number;
    name: string;
    external_id: string;
  }
  export interface OfficesEntity {
    id: number;
    name: string;
    location: string;
    external_id: string;
  }
  export interface HiringTeam {
    hiring_managers?: (HiringManagersEntityOrCoordinatorsEntity)[] | null;
    sourcers?: (SourcersEntityOrRecruitersEntity)[] | null;
    recruiters?: (SourcersEntityOrRecruitersEntity)[] | null;
    coordinators?: (HiringManagersEntityOrCoordinatorsEntity)[] | null;
  }
  export interface HiringManagersEntityOrCoordinatorsEntity {
    user_id: number;
    employee_id: string;
  }
  export interface SourcersEntityOrRecruitersEntity {
    user_id: number;
    employee_id?: null;
  }
  export interface CustomFields2 {
    date_test: DateTestOrEmploymentTypeOrTestField1;
    employment_type: DateTestOrEmploymentTypeOrTestField1;
    replacement_role_: ReplacementRole;
    salary_range_2: SalaryRange2;
    test_field_1: DateTestOrEmploymentTypeOrTestField1;
    test_user_field: TestUserField;
  }
  export interface ReplacementRole {
    name: string;
    type: string;
    value: boolean;
  }
  export interface SalaryRange2 {
    name: string;
    type: string;
    value: Value;
  }
  export interface Value {
    unit?: null;
    min_value: string;
    max_value: string;
  }
  export interface TestUserField {
    name: string;
    type: string;
    value: Value1;
  }
  export interface Value1 {
    user_id: number;
    name: string;
    email: string;
    employee_id: string;
  }
  
  
  