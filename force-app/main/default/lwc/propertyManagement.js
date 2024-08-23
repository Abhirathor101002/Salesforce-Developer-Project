import { LightningElement, api, track, wire } from 'lwc';
import getProperty from '@salesforce/apex/PropertHandler_LWC.getProperty';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class PropertyManagement extends LightningElement {
    @api recordId;
    userId = USER_ID;
    @track verifiedvar;
    @track typevar;
    @track istrue = false;
    @track isfalse = true;
    @track propertylist = [];

    columns = [
        { label: 'Property Name', fieldName: 'Property_Name__c' },
        { label: 'Property Type', fieldName: 'Type__c' },
        { label: 'Property Location', fieldName: 'Location__c' },
        { label: 'Property Link', fieldName: 'Property_link__c' } // Assuming Property_link__c is a field in your object
    ];

    propetyoptions = [
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Residential', value: 'Residential' },
        { label: 'Rental', value: 'rental' } // Corrected the spelling from 'rental' to 'Rental' for consistency
    ];

    @wire(getRecord, { recordId: '$userId', fields: ['User.Verified__c'] })
    recordFunction({ data, error }) {
        if (data) {
            this.verifiedvar = data.fields.Verified__c.value;
        } else {
            console.error('Error fetching user record:', error);
        }
    }

    changehandler(event) {
        this.typevar = event.target.value;
    }

    handleClick() {
        getProperty({ type: this.typevar, verified: this.verifiedvar })
            .then(result => {
                if (result && result.length > 0) {
                    this.propertylist = result;
                    this.istrue = true;
                    this.isfalse = false;
                } else {
                    this.propertylist = [];
                    this.istrue = false;
                    this.isfalse = true;
                }
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }
}
