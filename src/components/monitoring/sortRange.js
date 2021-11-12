const SortRange = (listMonitoring,initial,colors,count="count") => {
    if (listMonitoring.length) {
        let list = [...listMonitoring];
        let basic=50;
        list.sort((a, b) => a?.[count] - b?.[count]);
        let t = Math.floor((list[listMonitoring.length - 1]?.[count] / 4))
        let final = initial
        if (t >(2) )
        final = colors.map((a, i, array) => {
                return {
                    from: i === 0 ? -10 : (i * t) + 1 +basic,
                    to: (i === (array.length - 1)) ? (((i + 1) * t) + 100+basic) : (((i + 1) * t)+basic), // + 8
                    color: a
                }
            }
        )
        // console.log(t,final,list[listMonitoring.length - 1]?.[count])

            return final
    }
};

export default SortRange;
export const BasicNumber = 50;

