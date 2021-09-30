<!-- IMPORT emails/partials/header.tpl -->

<!-- Email Body : BEGIN -->
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width: 600px;">

	<!-- 1 Column Text : BEGIN -->
	<tr>
		<td bgcolor="#efeff0">
			<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
				<tr>
					<td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
					    <h1 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 20px; line-height: 27px; color: #333333; font-weight: normal;">[[contactpage:email.header, {from_name}]]</h1>
						<p style="margin: 0;">{content_text}</p>
					</td>
				</tr>
				<tr>
					<td style="padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;">
						<p style="margin: 0; font-style: italic;">{footer_text}</p>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<!-- 1 Column Text : END -->

</table>
<!-- Email Body : END -->

<!-- IMPORT emails/partials/footer.tpl -->
