import React from 'react'

function SoilModule() {
  return (
    <div className="bg-gray-300 absolute p-5 right-0 w-5/6 h-screen">
      <h1 className='text-xl font-semibold mb-2'>Soil Module</h1>

          <div className='overflow-auto rounded-lg shadow'>
                <table className='w-full'>
                <thead className='bg-gray-50 border-b-2 gray-200'>
                    <tr>
                        <th className='p-3 text-sm font-semi-bold tracking-wide text-left'>Nutrient</th>
                        <th className='p-3 text-sm font-semi-bold tracking-wide text-left'>Optimal Range</th>
                        <th className='p-3 text-sm font-semi-bold tracking-wide text-left'>Unit</th>
                        <th className='p-3 text-sm font-semi-bold tracking-wide text-left'>Function</th>

                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>

                    {/*ROW 1*/}
                    <tr className='bg-white'>
                        <td className='p-3 text-sm text-gray-700'>
                          Nitrogen (N)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          0.05 - 0.15%
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          %
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Promotes leafy growth and overall vigor
                        </td>
                    </tr>
                    {/*ROW 2*/}
                    <tr className='bg-gray-400'>
                        <td className='p-3 text-sm text-gray-700'>
                          Phosphorus (P)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          10 - 40 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          parts per million (ppm)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Supports root development and flowering
                        </td>
                    </tr>
                    {/*ROW 3*/}
                    <tr className='bg-white'>
                        <td className='p-3 text-sm text-gray-700'>
                          Potassium (K)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          100 - 300 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Enhance disease resistance and fruiting
                        </td>
                    </tr>
                    {/*ROW 4*/}
                    <tr className='bg-gray-400'>
                        <td className='p-3 text-sm text-gray-700'>
                          Calcium (Ca)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          1.5 - 4.0%
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          %
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Aids in cell wall structure and nutrient uptake
                        </td>
                    </tr>
                    {/*ROW 5*/}
                    <tr className='bg-white'>
                        <td className='p-3 text-sm text-gray-700'>
                          Magnesium (Mg)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          0.2 - 0.5%
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          %
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Essential for photosynthesis and enzyme activation
                        </td>
                    </tr>
                    {/*ROW 6*/}
                    <tr className='bg-gray-400'>
                        <td className='p-3 text-sm text-gray-700'>
                          Sulfur (S)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          0.2 - 0.5%
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          %
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Important for amino acid and protein formation
                        </td>
                    </tr>
                    {/*ROW 7*/}
                    <tr className='bg-white'>
                        <td className='p-3 text-sm text-gray-700'>
                          Iron (Fe)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          2 - 5 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Essential for chlorophyll production
                        </td>
                    </tr>
                    {/*ROW 8*/}
                    <tr className='bg-gray-400'>
                        <td className='p-3 text-sm text-gray-700'>
                          Manganese (Mn)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          1 - 10 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          involved in photosynthesis and enzyme activity
                        </td>
                    </tr>
                    {/*ROW 9*/}
                    <tr className='bg-white'>
                        <td className='p-3 text-sm text-gray-700'>
                          Zinc (Zn)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          0.5 - 2 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Essential for hormone regulation and growth
                        </td>
                    </tr>
                    {/*ROW 10*/}
                    <tr className='bg-gray-400'>
                        <td className='p-3 text-sm text-gray-700'>
                          Copper (Cu)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          0.2 - 2 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          affects nutrient uptake and enzyme function
                        </td>
                    </tr>
                    {/*ROW 11*/}
                    <tr className='bg-white'>
                        <td className='p-3 text-sm text-gray-700'>
                          Boron (B)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          0.5 - 2 ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          ppm
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Important for flower and fruit development
                        </td>
                    </tr>
                    {/*ROW 12*/}
                    <tr className='bg-gray-400'>
                        <td className='p-3 text-sm text-gray-700'>
                          pH (Acidity/Alkalinity)
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          6.0 - 6.8
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          -
                        </td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          Influence nutrient availability and microbial activity
                        </td>
                    </tr>
                    
                </tbody>
                </table>
            </div>
    </div>
  )
}

export default SoilModule
