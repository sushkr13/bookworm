import { InitialBookDetails } from '../models/initialbookdetails';

export class BookOpenDetails {
    
    bookOpeningType: string;
    riskBook: string;
    caseId: string;
    dateRequested: string;
    businessArea: string;
    requestedBy: string;
    bookSourceSysAttributes : InitialBookDetails[];

    constructor(
        bookOpeningType: string, riskBook: string, 
        caseId: string, dateRequested: string,
        businessArea: string, requestedBy: string,
        bookSourceSysAttributes: InitialBookDetails[]) 
    {
        this.bookOpeningType = bookOpeningType;
        this.riskBook = riskBook;
        this.caseId = caseId;
        this.dateRequested = dateRequested;
        this.businessArea = businessArea;
        this.requestedBy =  requestedBy;
        this.bookSourceSysAttributes = bookSourceSysAttributes;
    }
}