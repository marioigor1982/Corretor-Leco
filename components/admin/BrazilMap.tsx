import React, { useMemo } from 'react';

export const BrazilMap: React.FC<{
    data: { [key: string]: number };
    selectedState: string | null;
    onStateClick: (stateAbbr: string) => void;
    theme: 'light' | 'dark';
}> = ({ data, selectedState, onStateClick, theme }) => {
    const maxCount = useMemo(() => Math.max(1, ...Object.values(data) as number[]), [data]);

    const getColor = (stateAbbr: string) => {
        const count = data[stateAbbr] || 0;
        if (count === 0) return theme === 'dark' ? 'fill-slate-700' : 'fill-gray-300';
        return theme === 'dark' ? 'fill-blue-500' : 'fill-blue-600';
    };
    
    const getStyle = (stateAbbr: string) => {
        const count = data[stateAbbr] || 0;
        if (count === 0) return {};
        const opacity = 0.2 + (count / maxCount) * 0.8;
        return { opacity };
    };

    const baseClasses = "transition-all duration-200 cursor-pointer";
    const strokeClasses = theme === 'dark' ? "stroke-slate-900" : "stroke-white";
    
    // Lista de caminhos simplificados para representar os estados do Brasil
    const states = [
        { id: 'AC', d: 'M30,320 L60,320 L70,350 L40,360 Z' },
        { id: 'AM', d: 'M40,150 L150,150 L180,300 L60,320 L30,250 Z' },
        { id: 'RR', d: 'M120,50 L180,70 L170,140 L110,140 Z' },
        { id: 'PA', d: 'M160,140 L300,140 L330,250 L200,300 L170,150 Z' },
        { id: 'AP', d: 'M260,60 L300,70 L290,130 L250,130 Z' },
        { id: 'MA', d: 'M300,150 L360,160 L350,230 L310,230 Z' },
        { id: 'PI', d: 'M360,180 L400,190 L390,260 L350,250 Z' },
        { id: 'CE', d: 'M400,180 L440,190 L430,220 L390,210 Z' },
        { id: 'RN', d: 'M440,195 L470,200 L465,220 L435,215 Z' },
        { id: 'PB', d: 'M450,225 L480,230 L475,250 L445,245 Z' },
        { id: 'PE', d: 'M400,240 L470,255 L460,280 L390,265 Z' },
        { id: 'AL', d: 'M440,285 L465,290 L460,310 L435,305 Z' },
        { id: 'SE', d: 'M430,315 L455,320 L450,335 L425,330 Z' },
        { id: 'BA', d: 'M340,260 L420,280 L400,380 L320,350 Z' },
        { id: 'TO', d: 'M280,240 L330,250 L310,330 L260,320 Z' },
        { id: 'MT', d: 'M150,260 L250,270 L240,380 L140,370 Z' },
        { id: 'RO', d: 'M80,330 L130,340 L120,380 L70,370 Z' },
        { id: 'GO', d: 'M250,320 L300,330 L290,400 L240,390 Z' },
        { id: 'DF', d: 'M270,350 L285,350 L285,365 L270,365 Z' },
        { id: 'MS', d: 'M160,390 L230,400 L220,450 L150,440 Z' },
        { id: 'MG', d: 'M260,370 L340,385 L320,450 L240,430 Z' },
        { id: 'ES', d: 'M345,400 L365,405 L360,430 L340,425 Z' },
        { id: 'RJ', d: 'M310,455 L345,465 L335,480 L300,470 Z' },
        { id: 'SP', d: 'M210,435 L280,445 L260,485 L190,470 Z' },
        { id: 'PR', d: 'M180,460 L230,470 L210,500 L160,490 Z' },
        { id: 'SC', d: 'M170,500 L210,510 L200,530 L160,520 Z' },
        { id: 'RS', d: 'M140,510 L190,520 L160,570 L110,550 Z' }
    ];

    return (
        <svg version="1.1" id="svg-map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600" className="w-full h-auto">
            <g className={strokeClasses}>
                {states.map(state => (
                    <path
                        key={state.id}
                        id={state.id}
                        d={state.d}
                        onClick={() => onStateClick(state.id)}
                        style={getStyle(state.id)}
                        className={`${baseClasses} ${getColor(state.id)} ${selectedState === state.id ? 'stroke-2 !stroke-yellow-400' : ''}`}
                    />
                ))}
            </g>
        </svg>
    );
};