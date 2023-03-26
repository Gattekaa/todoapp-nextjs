export function AnimatedBackgrond() {

    const Circle = ({ size, className, id }) =>
      <div
        style={{ width: size, height: size }}
        className={`absolute blur-xl rounded-full sm:opacity-60 z-[0] animate-floating ${id % 2 === 0 ? 'animate-floating' : 'animate-floating-2'} ${className}`}
      />
  
    const circles = [
      {
        size: 100,
        className: 'bg-[#23001E] top-[40%] left-14'
      },
      {
        size: 320,
        className: 'bg-[#A4A9AD] -bottom-14 -left-14'
      },
      {
        size: 320,
        className: 'bg-[#20A39E] -top-14 -right-14'
      },
      {
        size: 180,
        className: 'bg-[#EF5B5B] top-28 right-28'
      },
      {
        size: 320,
        className: 'bg-[#6F0990]/20 -bottom-24 right-[256px]'
      },
      {
        size: 320,
        className: 'bg-[#FFBA49] -bottom-32 right-14'
      },
      {
        size: 320,
        className: 'bg-[#B9B4FD] -top-[125px] left-[22%]'
      },
      {
        size: 200,
        className: 'bg-[#AC47DB]/20 -bottom-32 left-[32%]'
      },
    ]
  
    return (
      <section className='absolute z-[0] top-0 saturate-50  left-0 w-full h-screen max-w-screen max-h-screen overflow-clip'>
        {circles.map((circle, index) =>
          <Circle
            key={index}
            id={index}
            size={circle.size}
            className={circle.className}
          />
        )}
      </section>
    )
  }