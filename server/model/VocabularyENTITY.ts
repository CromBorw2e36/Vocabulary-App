class VocabularyENTITY {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    create_at?: Date;
    create_by?: string;
    update_at?: Date;
    update_by?: string;
    delete_at?: Date;
    delete_by?: string;
    is_deleted?: boolean;
    is_edit?: boolean;
    phonicsTractions?: string;
    dev_status?: undefined | "ADD_NEW";

    constructor() { }
}

export default VocabularyENTITY;