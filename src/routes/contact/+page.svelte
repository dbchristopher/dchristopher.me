<h1>Contact</h1>

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
	<input type="hidden" name="form-name" value="contact" />
	<p class="hidden">
		<label>
			Don’t fill this out if you’re human: <input name="bot-field" />
		</label>
	</p>

	<p>
		<label>Your Name: <input type="text" name="name" required /></label>
	</p>
	<p>
		<label>Your Email: <input type="email" name="email" required /></label>
	</p>
	<p>
		<label
			>Your Role: <select name="role[]" multiple required>
				<option value="leader">Leader</option>
				<option value="follower">Follower</option>
			</select></label
		>
	</p>
	<p>
		<label>Message: <textarea name="message"></textarea></label>
	</p>
	<p>
		<button type="submit">Send</button>
	</p>
</form>

<style>
	.hidden {
		display: none;
	}
</style>
