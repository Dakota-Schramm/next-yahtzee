import React from 'react'

const Tooltip = (
  {tooltipText, children}: {tooltipText: string, children: React.ReactNode}
) => {
  console.log(tooltipText)
  return (
    <div className="relative inline-block border-b border-black border-dotted group">{children}
      <span className="bg-[#555] text-[#fff] text-center py-[5px] px-0 border-[6px] absolute z-10 bottom-[125%] left-[50%] ml-[-60px] opacity-0 delay-300 transition-opacity after:absolute after:top-full after:left-[50%] after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-[#555] group-hover:visible group-hover:opacity-100">{tooltipText}</span>
    </div>
  )
}

export default Tooltip