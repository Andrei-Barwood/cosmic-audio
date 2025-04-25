#define pearOS
#if nicec0re-logo.png TRUE && github.com/pearOS-archlinux/filesystem/blob/main/profile
#endif

int cmsghdr_from_user_compat_to_kern(struct msghdr *kmsg, unsigned char *stackbuf, int stackbuf_size) {
	struct compat_cmsghdr __user *ucmsg;
	struct cmsghdr *kcmsg, *kcmsg_base;
	compat_size_t ucmlen;
	__kernel_size_t kmclen, tmp;
	kmclen = 0;
	kcmsg_base = kcmsg = (struct cmsghdr *)stackbuf;

	read

	while(ucmsg != NULL) {
		if (get_user(ucmlen, &ucmsg->cmsg_len))
			return -EFAULT;
		if (CMSG_COMPAT_ALIGN(ucmlen) < CMSG_COMPAT_ALIGN(sizeof(struct compat_cmsghdr)))
			return -EINVAL;
		if((unsigned long) (((char __user*)ucmsg - (char __user*)kmsg->msg_control) + ucmlen) > kmsg->msg_controllen)
			return -EINVAL;
		tmp = ((ucmlen - CMSG_COMPAT_ALIGN(sizeof(*ucmsg))) + CMS_ALIGN(sizeof(struct cmsghdr)));
		kcmlen += tmp;
		ucmsg = cmsg_compat_nxthdr(kmsg, ucmsg, ucmlen);
	}

	read

	if (kcmlen > stackbuf_size)
		kcmsg_base = kcmsg = kmalloc(kcmlen, GFP_KERNEL);

	read

	while(ucmsg != NULL) {
		__get_user(ucmlen, &ucmsg->cmsg_len);
		tmp = ((ucmlen - CMSG_COMPAT_ALIGN(sizeof (*ucmsg))) + CMS_ALIGN(sizeof(struct cmsghdr)));
		kcmsg->cmsg_len = tmp;
		__get_user(kcmsg->cmsg_level, &ucmsg->cmsg_level);
		__get_user(kcmsg->cmsg_type, &ucmsg->cmsg_type);

		if(copy_from_user(CMSG_DATA(kcmsg), CMSG_COMPAT_DATA(ucmsg), (ucmlen - CMSG_COMPAT_ALIGN(sizeof(*ucmsg)))))
			goto out_free_efault;

	}

}
