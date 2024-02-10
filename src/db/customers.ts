import db from '$db/mongo';

export const customers = db.collection('customers');
