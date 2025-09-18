import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorHome from "../../../public/doutora.jpg";
import doctorHome2 from "../../../public/doutora2.webp";

export function Hero(){
    return(
        <section className="bg-green-50">
            <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8 ">
                <main className="flex flex-col md:flex-row items-center justify-center h-96">
                    <article className="space-y-6 mt-6 flex-[2]">
                        <h1 className="text-3xl text-center lg:text-5xl">Encontre os melhores profissionais em um único local!</h1>
                        <p className="text-sm md:text-lg text-gray-600">
                            Nós somos um plataforma para profissionais da saúde com foco em 
                            psicologia, nutrição e educação física. Aqui você pode encontrar
                            profissionais qualificados para te ajudar a alcançar seus objetivos
                            de saúde e bem-estar.
                        </p>
                        <Button className="bg-emerald-500 w-full md:w-[200px] hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded mt-4">
                            Encontre uma clicnica
                        </Button>
                    </article>
                    <div className="flex-1 z-10">
                        <Image src={doctorHome2} 
                            alt="doctor perfil"
                            className="z-10 object-contain hidden md:block w-[200px] md:w-[400px] h-[480px] md:pb-10 pb-52  mx-auto" 
                            width={380} height={380}
                            quality={100}
                            priority
                        />
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Hero;