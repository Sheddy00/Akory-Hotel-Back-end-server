// CUSTOMER LIST WITH RESERVATION CANCELLATION NUMBER

const CustomerListWithResCancelNumberQ = `
    SELECT cu.name,
        count(*) as cancel
    FROM "reservation" re
    INNER JOIN "customer" cu ON re.id_customer = cu.id
    WHERE re.is_cancelled = true
    GROUP BY cu.name;
`;

export default CustomerListWithResCancelNumberQ;