import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class AddTabMenuClickItemService {
    
    constructor() { }
    
    tabs = [
        'Pending Task List'
    ];

    requestId: string;
    
    addTabs(tabName: string, childTabs: string[])
    {
        if(childTabs===null)
        {
            console.log(tabName);
            if(tabName.toString().includes('- '))
            {
                this.requestId = tabName.substring(tabName.indexOf('- ') + 1);
            }
            this.tabs.push(tabName);
            console.log(this.tabs);
        }
        else
        {
            console.log(childTabs);
            childTabs.push(tabName);
            console.log(this.tabs);
        }
    }

    getRequestId()
    {
        return this.requestId;
    }

}