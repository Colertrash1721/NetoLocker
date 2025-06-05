import SimpleChart from "@/components/dashboard/linechart"
import TableLayout from "@/components/dashboard/tableLayout"

export default function page() {
  return (
    <section className="grid grid-rows-2 text-black p-4">
      <section className="pt-6">
        <SimpleChart />
      </section>
      <TableLayout></TableLayout>
    </section>
  )
}
