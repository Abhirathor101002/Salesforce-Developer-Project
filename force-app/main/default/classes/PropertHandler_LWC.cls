public class PropertHandler_LWC {

    @AuraEnabled(cacheable=true)
    public static List<Property__c> getProperty(String type, Boolean verified) {
        return [SELECT Id, Location__c, Property_Name__c, Type__c, Verified__c 
                FROM Property__c 
                WHERE Type__c = :type AND Verified__c = :verified];
    }
}
