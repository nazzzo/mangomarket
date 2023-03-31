import { RadialBarChart, RadialBar, Tooltip as RechartsTooltip, Text } from 'recharts';
import { useState } from 'react';
import { MyPointWrapper, TooltipWrapper, TooltipLabel } from './styled';

export const MyPoint = ({ email, username, chart, sum }) => {

  const mangoScore = Math.round(30 + (sum.boardCount * 1.5) + sum.communityCount + (sum.soldCount * 3));
  const [activeIndex, setActiveIndex] = useState(null);

  const data = [
    { name: '망고지수', value: mangoScore },
  ];

  const handleMouseOver = (data, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const renderTooltipContent = () => {
    if (activeIndex !== null) {
      return (
        <TooltipWrapper>
          <TooltipLabel>{username}님의 게시글 {sum.boardCount}</TooltipLabel>
          <TooltipLabel>성사된 교환내역 {sum.soldCount}</TooltipLabel>
        </TooltipWrapper>
      );
    } else {
      return null;
    }
  };

  return (
    <MyPointWrapper score={mangoScore} sum={sum} >
      <RadialBarChart
        width={120}
        height={120}
        innerRadius="10%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
        animationBegin={1000}
      >
        <RadialBar
          minAngle={15}
          background
          clockWise
          dataKey="value"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          fill="#f4be4f"
        />
        <RechartsTooltip
          isAnimationActive={false}
          cursor={false}
          content={renderTooltipContent}
        />
        <Text x={60} y={65} textAnchor="middle" fontSize={24}>
          {mangoScore}
        </Text>
      </RadialBarChart>
    </MyPointWrapper>
  );
};
