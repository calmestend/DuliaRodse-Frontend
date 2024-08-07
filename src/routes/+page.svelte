<script lang="ts">
	import ImageMain from '$lib/assets/vino-tinto.webp';
	import BranchSelection from '$lib/components/BranchSelection.svelte';
</script>

<main>
	<div class="text-content">
		<h1>DuliaRodse 🧼</h1>
		<h2>Hola 🖐</h2>
		<p>
			Nosotros somos una empresa 100% mexicana que produce jabones naturales, nosotros estamos
			enfocados en el cuidado de la piel y del medio ambiente.
		</p>
		<p>
			Nuestra historia empieza en el 2010, cuando decidimos ayudar a la gente en el cuidado de su
			piel de una manera natural.
		</p>
		<BranchSelection message={'Conoce nuestros productos 🌸'} />
	</div>
	<div class="image-container">
		<img src={ImageMain} alt="Imagen principal" />
	</div>
</main>

<style lang="scss">
	/* Paleta de colores */
	$primary-color: #1e1e1e; /* Color de texto y detalles */
	$background-color: #ffffff; /* Fondo blanco para el contenido */
	$accent-color: #f0f8ff; /* Color de acento para detalles y botones */

	main {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 2rem;
		color: $primary-color;
		text-align: left;
		gap: 1rem;

		.text-content {
			max-width: 600px;
			flex: 1;
		}

		.image-container {
			width: 100%;
			max-width: 500px;
			flex: 1;

			img {
				width: 100%;
				height: auto;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			}
		}
	}

	h1,
	h2 {
		margin: 0;
		color: $primary-color;
	}

	h1 {
		font-size: 3.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h2 {
		font-size: 2.5rem;
	}

	p {
		font-size: 1.5rem;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		main {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.text-content {
			max-width: none;
			margin-bottom: 2rem;
		}

		.image-container {
			max-width: 100%;
		}
	}
</style>
