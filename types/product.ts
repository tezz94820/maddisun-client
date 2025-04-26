export type ProductType = {
    _id: string,
    name: string,
    cas_no: string,
    end_use: string,
    type: string,
    selected: boolean,
    category: string
}

export type SendEnquiryFormdataType = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
}