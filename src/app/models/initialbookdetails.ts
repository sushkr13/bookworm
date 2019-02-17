export interface InitialBookDetails  {
    id: number,
    isPrimary: boolean,
    isNewLedger: boolean,
    bookName: string,
    sourceSystem: string,
    sourceSystemLocation: string,
    valuationAdjustmentBookType: string,
    bookClassification: string,    
    glPostingStatus: string,
    walkerPostingIndicator: boolean,
    walkerPostingSource: string,
    crFeed: boolean,
    mrFeed: boolean,
    confirmationFlag: boolean,
    settlementFlag: boolean
  }

