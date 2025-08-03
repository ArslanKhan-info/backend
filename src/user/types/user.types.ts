



export interface User {
    first_name?: string,
    last_name?: string,
    dob?: Date,
    gender?: string,
    email?: string
    mobile: string,
    country_code:string,
    is_profile_completed?: boolean,
    // 0 deleted 1 active 2 disabled by admin
    status?: 0 | 1 | 2 ,
    created_at?: Date;
}





