import SimpleChart from "@/components/dashboard/linechart"
import TableContainerLayout from "@/components/dashboard/tableContainerLayout"
import TableFreeloadLayout from "@/components/dashboard/tableFreeloadLayout"

export default function page() {
  return (
    <section className="grid grid-rows-2 text-black p-4">
      <section className="pt-6">
        <SimpleChart />
      </section>
      <div className="text-center">
        <h1>Contenedores</h1>
        <TableContainerLayout />
        <h1>Carga suelta</h1>
        <TableFreeloadLayout />
      </div>
    </section>
  )
}
