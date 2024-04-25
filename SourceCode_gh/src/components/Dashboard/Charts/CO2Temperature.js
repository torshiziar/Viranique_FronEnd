import React, {useState, useEffect, useLayoutEffect} from "react";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


const CO2Temperature = (props) => {
    const [axisDataItem, setAxisDataItem] = useState(null);
    const [xAxis, setXAxis] = useState();
    const [chart, setChart] = useState();

    useLayoutEffect(() => {

        const root = am5.Root.new(props?.id, {
            useSafeResolution: false
        });
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        let objChart = root.container.children.push(
            am5radar.RadarChart.new(root, {
                panX: false,
                panY: false,
                startAngle: 180,
                endAngle: 355,
            })
        );

        let axisRenderer = am5radar.AxisRendererCircular.new(root, {
            innerRadius: -1,
            strokeOpacity: 1,
            strokeWidth: 6,
            strokeGradient: am5.LinearGradient.new(root, {
                rotation: 0,
                stops: [
                    {color: am5.color("#dfe6df")},
                    {color: am5.color("#807c7c")},
                    {color: am5.color("#4a4646")}
                ]
            })
        });

        let objXAxis = objChart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                maxDeviation: 0,
                min: 0,
                max: 2000,
                strictMinMax: true,
                renderer: axisRenderer,
            })
        );

        objXAxis.get("renderer").labels.template.setAll({
            opacity: 0
        });


        let axisDataItemObj = objXAxis.makeDataItem({});
        axisDataItemObj.set("value", props?.value);

        let bullet = axisDataItemObj.set("bullet", am5xy.AxisBullet.new(root, {
            sprite: am5radar.ClockHand.new(root, {
                // radius: am5.percent(90),
                topWidth: 3,
                bottomWidth: 10,
                radius: am5.percent(85),
                innerRadius: 0,
            })
        }));

        bullet.get("sprite").hand.setAll({
            fill: am5.color("#7e88aa"),
            strokeWidth: 1,
            fillOpacity: 1,
        });

        bullet.get("sprite").pin.setAll({
            fill: am5.color("#EDEFF1"),
            strokeWidth: 2,
            fillOpacity: 1,
        });


        objXAxis.createAxisRange(axisDataItemObj);

        axisDataItemObj.get("grid").set("visible", false);

        objChart.appear(1000, 100);

        setChart(objChart)
        setAxisDataItem(axisDataItemObj);
        setXAxis(objXAxis)

        return () => {
            root.dispose()
        }

    }, [])

    useEffect(() => {
        axisDataItem && axisDataItem.animate({
            key: "value",
            to: +props?.value,
            duration: 800,
            easing: am5.ease.out(am5.ease.cubic)
        });
    }, [props?.value, props?.id])


    return (
        <>
            <div className="col-7 chart-holder p-0" id={props?.id}/>
        </>
    )
}


export default CO2Temperature;