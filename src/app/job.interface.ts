export interface JobDetail {
    id: number,
    companyName: string,
    title: string;
    companyLogo: string,
    reference: string;
    isFavSelected: boolean;
}
export interface JobDescription {
    id: number,
    companyName: string,
    title: string;
    companyLogo: string,
    reference: string;
    location: string;
    industries: string;
    types: string;
    description: string;
    publishDate: string;
}