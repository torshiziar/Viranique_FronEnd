
export const generateChartGrafana= (addChart,dataEditGrafana)=>{
    let Index;
        addChart.map((item, index) => {
            if (item.props.counter == dataEditGrafana.counter) {
                Index= index;
            }
        }
    )
    return Index;
}