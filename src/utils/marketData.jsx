// აქ მომავალში შეგვიძლია რეალური API მივაბათ
export const getLiveMarketRates = () => {
    return {
        avgMortgageRate: 11.5, // საშუალო იპოთეკა საქართველოში
        marketGrowth: 5.2,     // RPPI ინდექსის საშუალო წლიური ზრდა
        lastUpdated: new Date().toLocaleDateString()
    };
};