//Literal class to save all String messages and values to be used in the application
class Literals {

    static APP_NAME: string = ${{values.application_name}};
    static CLIENT_ID: string = ${{values.client_id}};
    static COMPANY_TEAM_NAME: string = ${{values.company_team_name}};
    static BASE_URL: string = ${{values.base_url}};

    static COMPANY_HOMEPAGE: string = ${{values.company_homepage_url}};
    static MAIL_TO_CONTACT_US: string = ${{values.contact_us_mailto}};

    static WHATS_NEW_CONTENT: string = ${{values.whats_new_content}}; 

}

export default Literals;
